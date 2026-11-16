import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/publico/Header";
import Rodape from "../../components/publico/Rodape";
import { ID_STATUS, nomePorId, tiposImovel, tiposNegociacao } from "../../dados/tabelasAuxiliares";
import { buscarImovelPorId } from "../../services/imovelService";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { ehAluguel } from "../../utils/imovel";

const WHATSAPP = "https://wa.me/5585987823726";

// Página de um imóvel publicado, com galeria de fotos.
export default function DetalheImovel() {
  const { id } = useParams();
  const [estado, setEstado] = useState({ imovel: null, carregando: true });
  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    let ativo = true;
    // Rascunhos não podem ser lidos pelo público: o erro de permissão cai aqui como "não encontrado"
    buscarImovelPorId(id)
      .catch(() => null)
      .then((imovel) => {
        if (ativo) setEstado({ imovel: imovel?.id_status === ID_STATUS.publicado ? imovel : null, carregando: false });
      });
    return () => {
      ativo = false;
    };
  }, [id]);

  const { imovel, carregando } = estado;

  let conteudo;
  if (carregando) {
    conteudo = <p className="text-sm text-[var(--color-texto-suave)]">Carregando imóvel...</p>;
  } else if (!imovel) {
    conteudo = (
      <div>
        <p className="mb-4 text-[var(--color-texto-suave)]">Este imóvel não está disponível.</p>
        <Link to="/imoveis" className="font-semibold text-[var(--color-dourado)]">← Ver todos os imóveis</Link>
      </div>
    );
  } else {
    const { endereco = {}, fotos = [] } = imovel;
    const dados = [
      ["Quartos", imovel.numero_quartos],
      ["Suítes", imovel.numero_suites],
      ["Banheiros", imovel.numero_banheiros],
      ["Vagas", imovel.numero_vagas],
      ["Área construída", imovel.area_construida != null && `${imovel.area_construida} m²`],
      ["Terreno", imovel.terreno != null && `${imovel.terreno} m²`],
    ].filter(([, valor]) => valor !== null && valor !== undefined && valor !== false);

    conteudo = (
      <>
        <Link to="/imoveis" className="text-sm text-[var(--color-dourado)] hover:text-[var(--color-texto)]">← Todos os imóveis</Link>

        <div className="mt-6 grid grid-cols-[1.4fr_1fr] gap-8 max-[900px]:grid-cols-1">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-[0.45rem] bg-[var(--color-superficie-elevada)]">
              {fotos[fotoAtual] ? (
                <img src={fotos[fotoAtual].url} alt={`${imovel.nome} — foto ${fotoAtual + 1}`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[var(--color-texto-mudo)]">Sem fotos</div>
              )}
            </div>
            {fotos.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2 max-[480px]:grid-cols-4">
                {fotos.map((foto, indice) => (
                  <button
                    key={foto.id}
                    type="button"
                    onClick={() => setFotoAtual(indice)}
                    aria-label={`Ver foto ${indice + 1}`}
                    className={`aspect-[4/3] cursor-pointer overflow-hidden rounded border-2 ${indice === fotoAtual ? "border-[var(--color-rosa)]" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={foto.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="m-0 text-xs font-bold tracking-[0.06em] text-[var(--color-dourado)] uppercase">
              {nomePorId(tiposImovel, imovel.id_tipo_imovel)} · {nomePorId(tiposNegociacao, imovel.id_tipo_negociacao)}
            </p>
            <h1 className="m-0 mt-2 font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] font-medium">{imovel.nome}</h1>
            <p className="m-0 mt-2 text-sm text-[var(--color-texto-suave)]">
              {[endereco.rua && `${endereco.rua}, ${endereco.numero}`, endereco.bairro, `${endereco.cidade ?? ""} - ${endereco.estado ?? ""}`]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {imovel.preco != null && (
              <p className="m-0 mt-5 font-serif text-4xl font-medium">
                {formatadorDeMoeda.format(imovel.preco)}
                {ehAluguel(imovel.id_tipo_negociacao) && <span className="text-base font-normal text-[var(--color-texto-mudo)]"> /mês</span>}
              </p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-3">
              {dados.map(([rotulo, valor]) => (
                <div key={rotulo} className="rounded-[0.45rem] border border-[var(--color-borda)] bg-[var(--color-cartao)] px-3 py-2.5">
                  <dt className="text-xs tracking-[0.04em] text-[var(--color-texto-mudo)] uppercase">{rotulo}</dt>
                  <dd className="m-0 mt-1 text-base font-semibold">{valor}</dd>
                </div>
              ))}
            </dl>

            <a
              href={`${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel ${imovel.nome} (${imovel.id}).`)}`}
              className="mt-6 flex items-center justify-center rounded bg-[#b20f3c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c31849]"
            >
              Falar sobre este imóvel no WhatsApp
            </a>
          </div>
        </div>

        {imovel.sobre_imovel && (
          <section className="mt-10 max-w-3xl">
            <h2 className="m-0 mb-3 font-serif text-2xl font-medium">Sobre o imóvel</h2>
            <p className="m-0 text-base leading-relaxed whitespace-pre-line text-[var(--color-texto-suave)]">{imovel.sobre_imovel}</p>
          </section>
        )}

        {imovel.comodidades?.length > 0 && (
          <section className="mt-8">
            <h2 className="m-0 mb-3 font-serif text-2xl font-medium">Comodidades</h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {imovel.comodidades.map((item) => (
                <li key={item} className="rounded-full border border-[var(--color-borda)] px-3.5 py-1.5 text-sm text-[var(--color-texto-suave)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-secao)] text-[var(--color-texto)]">
      <Header />
      <main className="mx-auto w-full max-w-[81rem] px-[clamp(1.25rem,5vw,2.5rem)] pt-32 pb-16">{conteudo}</main>
      <Rodape />
    </div>
  );
}
