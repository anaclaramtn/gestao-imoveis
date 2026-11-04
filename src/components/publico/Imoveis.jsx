import { Link } from "react-router-dom";
import * as imoveisLocal from "../../services/imoveisLocal";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { ehAluguel, ehPublicado } from "../../utils/imovel";

const fotosDeExemplo = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
];

function enderecoResumido(endereco) {
  return [endereco?.bairro, endereco?.cidade].filter(Boolean).join(", ");
}

function imagemDoImovel(imovel, indice) {
  const capa = imovel.fotos?.[0];
  return typeof capa === "string" ? capa : capa?.url || fotosDeExemplo[indice % fotosDeExemplo.length];
}

function precoDoImovel(imovel) {
  const preco = formatadorDeMoeda.format(imovel.preco);
  return ehAluguel(imovel.id_tipo_negociacao) ? `${preco}/mês` : preco;
}

export default function Imoveis({ limite }) {
  const imoveisPublicados = imoveisLocal.listar().filter((imovel) => ehPublicado(imovel.id_status));
  const imoveisVisiveis = limite ? imoveisPublicados.slice(0, limite) : imoveisPublicados;

  return (
    <section
      className="scroll-mt-20 bg-[var(--color-fundo)] px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(3.5rem,8vh,5.5rem)] text-[var(--color-texto)]"
      id="imoveis"
      aria-labelledby="imoveis-titulo"
    >
      <div className="mx-auto max-w-[81rem]">
        <div className="mb-7 flex items-end justify-between gap-6 max-[640px]:mb-5 max-[640px]:flex-col max-[640px]:items-start">
          <div>
            <p className="mb-2.5 table rounded-full border border-[rgb(168_25_54_/_35%)] bg-[rgb(168_25_54_/_12%)] px-2.5 py-1 text-[0.55rem] leading-[1.2] font-bold tracking-[0.035em] text-[var(--color-rosa)] uppercase">
              Venda &amp; aluguel
            </p>
            <h2
              className="m-0 font-serif text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05] font-medium text-[var(--color-texto)] [text-wrap:balance]"
              id="imoveis-titulo"
            >
              Uma seleção à altura dos seus planos.
            </h2>
          </div>
          {limite && (
            <Link
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-[rgb(217_154_114_/_45%)] px-5 text-xs text-[var(--color-dourado)] no-underline transition-colors hover:border-[var(--color-dourado)] hover:bg-[rgb(217_154_114_/_9%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dourado)] max-[640px]:min-h-9 max-[640px]:px-4"
              to="/imoveis"
            >
              Ver todos os imóveis
            </Link>
          )}
        </div>

        {imoveisVisiveis.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1" id="lista-imoveis">
            {imoveisVisiveis.map((imovel, indice) => {
              const aluguel = ehAluguel(imovel.id_tipo_negociacao);
              const quartos = imovel.numero_quartos ?? 0;
              const banheiros = imovel.numero_banheiros ?? 0;
              const area = imovel.area_construida ?? 0;

              return (
                <article
                  className="group min-w-0 overflow-hidden rounded-[var(--radius-cartao)] border border-[#24191b] bg-[#0e0b0c] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgb(230_51_120_/_35%)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  key={imovel.id}
                >
                  <div className="relative h-[clamp(12rem,19.5vw,17rem)] overflow-hidden bg-[var(--color-superficie-elevada)] max-[800px]:h-56 max-[560px]:h-[15rem]">
                    <img
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      src={imagemDoImovel(imovel, indice)}
                      alt={`Foto de ${imovel.nome}`}
                      loading={indice < 3 ? "eager" : "lazy"}
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[var(--color-primaria)] px-3 py-1.5 text-[0.58rem] leading-none font-bold text-white uppercase">
                      {aluguel ? "Para alugar" : "À venda"}
                    </span>
                    {imovel.fotos?.length > 0 && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[0.625rem] text-white">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                          <rect x="2" y="3" width="12" height="10" rx="1.5" />
                          <circle cx="6" cy="7" r="1.2" />
                          <path d="m3 11 3-2.5 2 1.5 2-2 3 3" />
                        </svg>
                        {imovel.fotos.length} {imovel.fotos.length === 1 ? "foto" : "fotos"}
                      </span>
                    )}
                  </div>

                  <div className="px-3.5 pt-0 pb-3.5">
                    <span className="flex gap-1 py-2" aria-hidden="true">
                      <i className="h-0.5 w-3.5 bg-[var(--color-rosa)]" />
                      <i className="h-0.5 w-1.5 bg-[#6b273c]" />
                      <i className="h-0.5 w-1.5 bg-[#6b273c]" />
                    </span>
                    <h3 className="m-0 font-serif text-[1.35rem] leading-tight font-medium text-[var(--color-texto)]">
                      {imovel.nome}
                    </h3>
                    <p className="mt-1.5 mb-3 flex items-center gap-1.5 text-[0.7rem] text-[#968b88]">
                      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                        <path d="M13 6.7c0 3.3-5 7.3-5 7.3S3 10 3 6.7a5 5 0 1 1 10 0Z" />
                        <circle cx="8" cy="6.5" r="1.5" />
                      </svg>
                      {enderecoResumido(imovel.endereco)}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-[#211719] py-2.5 text-[0.68rem] text-[#c4b8b4]">
                      <span>{quartos} {quartos === 1 ? "quarto" : "quartos"}</span>
                      <span>{banheiros} {banheiros === 1 ? "banheiro" : "banheiros"}</span>
                      <span>{area} m²</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <p className="m-0 font-serif text-lg text-[var(--color-dourado)]">{precoDoImovel(imovel)}</p>
                      <Link
                        className="inline-flex min-h-9 items-center justify-center rounded-md border border-[rgb(217_154_114_/_45%)] px-3.5 text-[0.7rem] text-[var(--color-dourado)] no-underline transition-colors hover:border-[var(--color-dourado)] hover:bg-[rgb(217_154_114_/_9%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dourado)]"
                        to={`/imoveis/${imovel.id}`}
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="m-0 rounded-lg border border-[rgb(90_52_61_/_30%)] bg-[#0d0b0c] px-5 py-8 text-center text-sm text-[var(--color-texto-suave)]">
            Ainda não há imóveis publicados. Em breve teremos novidades por aqui.
          </p>
        )}
      </div>
    </section>
  );
}
