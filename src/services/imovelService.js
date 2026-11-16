import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { ID_STATUS } from "../dados/tabelasAuxiliares";
import { db } from "../firebase/config";
import { comprimirFoto, criarMiniatura } from "../utils/imagem";

/*
  Imóveis no Firestore:
    imoveis/{codigo}              → dados do imóvel (o id do documento é o código: KR-001...)
                                    fotos: [{ id }] na ordem de exibição (a primeira é a capa)
                                    capa: miniatura da primeira foto (para a lista não ler todas as fotos)
    imoveis/{codigo}/fotos/{id}   → { dados: "data:image/jpeg;base64,..." } uma foto por documento
    contadores/imoveis            → { ultimo: 12 } usado para gerar o próximo código

  Para o resto do app, cada foto é { id, url } (url = a imagem em texto).
*/
const COLECAO = "imoveis";

const refFotos = (codigo) => collection(db, COLECAO, codigo, "fotos");

// Mais novos primeiro (KR-010 vem antes de KR-009)
const maisNovosPrimeiro = (a, b) => b.id.localeCompare(a.id);

// Na lista só vem a capa; as outras fotos são carregadas ao abrir o imóvel
function paraItemDeLista(documento) {
  const { capa, fotos = [], ...dados } = documento.data();
  return { ...dados, id: documento.id, fotos: fotos.map((foto, indice) => ({ id: foto.id, url: indice === 0 ? capa : null })) };
}

// Lista todos os imóveis (painel do corretor — exige login)
export async function listarImoveis() {
  const resultado = await getDocs(collection(db, COLECAO));
  return resultado.docs.map(paraItemDeLista).sort(maisNovosPrimeiro);
}

// Lista só os publicados (catálogo público — não exige login)
export async function listarImoveisPublicados() {
  const consulta = query(collection(db, COLECAO), where("id_status", "==", ID_STATUS.publicado));
  const resultado = await getDocs(consulta);
  return resultado.docs.map(paraItemDeLista).sort(maisNovosPrimeiro);
}

// Busca um imóvel com todas as fotos
export async function buscarImovelPorId(id) {
  const documento = await getDoc(doc(db, COLECAO, id));
  if (!documento.exists()) return null;

  const { capa, fotos: ordem = [], ...dados } = documento.data();
  void capa;
  const fotosSalvas = await getDocs(refFotos(id));
  const urlPorId = new Map(fotosSalvas.docs.map((foto) => [foto.id, foto.data().dados]));

  const fotos = ordem.filter((foto) => urlPorId.has(foto.id)).map((foto) => ({ id: foto.id, url: urlPorId.get(foto.id) }));
  return { ...dados, id: documento.id, fotos };
}

// Reserva o próximo código (KR-001, KR-002...) de forma segura, mesmo com duas pessoas salvando juntas
async function criarDocumentoComNovoCodigo(dados) {
  const refContador = doc(db, "contadores", "imoveis");

  return runTransaction(db, async (transacao) => {
    const contador = await transacao.get(refContador);
    const proximo = (contador.exists() ? contador.data().ultimo : 0) + 1;
    const codigo = `KR-${String(proximo).padStart(3, "0")}`;

    transacao.set(refContador, { ultimo: proximo });
    transacao.set(doc(db, COLECAO, codigo), { ...dados, fotos: [], criado_em: serverTimestamp() });
    return codigo;
  });
}

// Cria (sem id) ou atualiza (com id) um imóvel. Devolve o imóvel salvo, já com o código.
export async function salvarImovel(imovel) {
  // criado_em/atualizado_em são controlados pelo servidor
  const { id, fotos = [], criado_em: _c, atualizado_em: _a, ...dados } = imovel;
  const codigo = id ?? (await criarDocumentoComNovoCodigo(dados));

  try {
    const anteriores = await getDocs(refFotos(codigo));
    const idsAnteriores = anteriores.docs.map((foto) => foto.id);

    // Grava só as fotos novas (as que têm `arquivo`); as já salvas continuam como estão
    for (const foto of fotos.filter((atual) => atual.arquivo)) {
      await setDoc(doc(refFotos(codigo), foto.id), { dados: await comprimirFoto(foto.arquivo) });
    }

    // Miniatura da capa, a partir do arquivo novo ou da imagem já salva
    const primeira = fotos[0];
    const capa = primeira ? await criarMiniatura(primeira.arquivo ?? (await (await fetch(primeira.url)).blob())) : null;

    await setDoc(
      doc(db, COLECAO, codigo),
      { ...dados, fotos: fotos.map((foto) => ({ id: foto.id })), capa, atualizado_em: serverTimestamp() },
      { merge: true },
    );

    // Só depois de tudo certo apaga as fotos que o corretor removeu
    const mantidas = new Set(fotos.map((foto) => foto.id));
    await Promise.all(
      idsAnteriores.filter((idFoto) => !mantidas.has(idFoto)).map((idFoto) => deleteDoc(doc(refFotos(codigo), idFoto))),
    );

    return { ...dados, id: codigo };
  } catch (erro) {
    // Se falhou ao criar, não deixa um imóvel pela metade
    if (!id) await excluirImovel({ id: codigo }).catch(() => {});
    throw erro;
  }
}

export async function excluirImovel(imovel) {
  const fotos = await getDocs(refFotos(imovel.id));
  await Promise.all(fotos.docs.map((foto) => deleteDoc(foto.ref)));
  await deleteDoc(doc(db, COLECAO, imovel.id));
}
