import { imoveisExemplo } from "../dados/imoveisExemplo";

/*
  "Banco de dados de mentira" enquanto o Firestore não está ligado.
  Guarda os imóveis na memória: tudo volta ao estado inicial quando a página é recarregada.

  As funções têm os mesmos nomes que o serviço real deve ter, então depois
  é só trocar o conteúdo delas por chamadas ao Firestore.
*/
let imoveis = [...imoveisExemplo];

export function listar() {
  return imoveis;
}

export function buscarPorId(id) {
  return imoveis.find((imovel) => imovel.id === id) ?? null;
}

// Gera o próximo código: KR-001, KR-002, ...
function proximoId() {
  const maior = imoveis.reduce((max, imovel) => Math.max(max, Number(imovel.id.replace("KR-", "")) || 0), 0);
  return `KR-${String(maior + 1).padStart(3, "0")}`;
}

// Cria (sem id) ou atualiza (com id) um imóvel. Devolve o imóvel salvo.
export function salvar(imovel) {
  if (imovel.id) {
    imoveis = imoveis.map((atual) => (atual.id === imovel.id ? imovel : atual));
    return imovel;
  }

  const novo = { ...imovel, id: proximoId() };
  imoveis = [novo, ...imoveis]; // os mais novos aparecem primeiro na lista
  return novo;
}

export function excluir(id) {
  imoveis = imoveis.filter((imovel) => imovel.id !== id);
}
