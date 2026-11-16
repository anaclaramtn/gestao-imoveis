import { useState } from "react";

import CartaoImovel from "../../components/publico/CartaoImovel";
import Header from "../../components/publico/Header";
import Rodape from "../../components/publico/Rodape";
import { tiposImovel, tiposNegociacao } from "../../dados/tabelasAuxiliares";
import { useImoveisPublicados } from "../../hooks/useImoveisPublicados";
import { normalizarTexto } from "../../utils/formatadores";

const POR_PAGINA = 12;

const FILTROS_VAZIOS = { busca: "", tipo: "", negociacao: "", quartos: "", precoMin: "", precoMax: "" };

const OPCOES_QUARTOS = [
  { valor: "1", texto: "1+ quartos" },
  { valor: "2", texto: "2+ quartos" },
  { valor: "3", texto: "3+ quartos" },
  { valor: "4", texto: "4+ quartos" },
];

const ESTILO_CAMPO =
  "h-11 w-full rounded-md border border-[var(--color-borda)] bg-[var(--color-campo)] px-3 text-sm text-[var(--color-texto)] outline-none transition-colors placeholder:text-[var(--color-texto-mudo)] focus:border-[var(--color-rosa)]";

const ESTILO_ROTULO = "mb-1.5 block text-xs font-bold tracking-[0.06em] text-[var(--color-dourado)] uppercase";

function Campo({ rotulo, id, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={ESTILO_ROTULO}>
        {rotulo}
      </label>
      {children}
    </div>
  );
}

// Só dígitos, para os campos de preço
const soDigitos = (texto) => texto.replace(/\D/g, "").slice(0, 10);

function combinaComFiltros(imovel, filtros) {
  const { endereco = {} } = imovel;

  if (filtros.busca) {
    const alvo = normalizarTexto([imovel.nome, imovel.id, endereco.bairro, endereco.cidade].filter(Boolean).join(" "));
    if (!alvo.includes(normalizarTexto(filtros.busca.trim()))) return false;
  }
  if (filtros.tipo && imovel.id_tipo_imovel !== Number(filtros.tipo)) return false;
  if (filtros.negociacao && imovel.id_tipo_negociacao !== Number(filtros.negociacao)) return false;
  if (filtros.quartos && (imovel.numero_quartos ?? 0) < Number(filtros.quartos)) return false;
  if (filtros.precoMin && (imovel.preco ?? 0) < Number(filtros.precoMin)) return false;
  if (filtros.precoMax && (imovel.preco ?? Infinity) > Number(filtros.precoMax)) return false;
  return true;
}

// Catálogo público: todos os imóveis publicados, com filtros.
export default function Imoveis() {
  const { imoveis, carregando, erro } = useImoveisPublicados();
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
  const [visiveis, setVisiveis] = useState(POR_PAGINA);

  function alterar(campo, valor) {
    setFiltros((atuais) => ({ ...atuais, [campo]: valor }));
    setVisiveis(POR_PAGINA);
  }

  const filtrados = imoveis.filter((imovel) => combinaComFiltros(imovel, filtros));
  const filtrosAtivos = Object.values(filtros).some(Boolean);

  return (
    <div className="min-h-screen bg-[var(--color-secao)] text-[var(--color-texto)]">
      <Header />
      <main className="mx-auto w-full max-w-[81rem] px-[clamp(1.25rem,5vw,2.5rem)] pt-32 pb-16">
        <h1 className="m-0 mb-8 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-medium">Nossos imóveis</h1>

        {carregando ? (
          <p className="text-base text-[var(--color-texto-suave)]">Carregando imóveis...</p>
        ) : erro ? (
          <p className="text-base text-[var(--color-texto-suave)]">
            Não foi possível carregar os imóveis agora. Tente novamente em instantes.
          </p>
        ) : imoveis.length === 0 ? (
          <p className="text-base text-[var(--color-texto-suave)]">Nenhum imóvel disponível no momento.</p>
        ) : (
          <>
            <form
              className="mb-8 rounded-[0.45rem] border border-[var(--color-borda)] bg-[var(--color-cartao)] p-5"
              onSubmit={(evento) => evento.preventDefault()}
              aria-label="Filtrar imóveis"
            >
              <div className="grid grid-cols-4 gap-4 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1">
                <Campo rotulo="Buscar" id="filtro-busca">
                  <input
                    id="filtro-busca"
                    type="search"
                    className={ESTILO_CAMPO}
                    placeholder="Nome, bairro ou cidade"
                    value={filtros.busca}
                    onChange={(e) => alterar("busca", e.target.value)}
                  />
                </Campo>

                <Campo rotulo="Tipo de imóvel" id="filtro-tipo">
                  <select id="filtro-tipo" className={ESTILO_CAMPO} value={filtros.tipo} onChange={(e) => alterar("tipo", e.target.value)}>
                    <option value="">Todos os tipos</option>
                    {tiposImovel.map(({ id, nome }) => (
                      <option key={id} value={id}>{nome}</option>
                    ))}
                  </select>
                </Campo>

                <Campo rotulo="Negociação" id="filtro-negociacao">
                  <select
                    id="filtro-negociacao"
                    className={ESTILO_CAMPO}
                    value={filtros.negociacao}
                    onChange={(e) => alterar("negociacao", e.target.value)}
                  >
                    <option value="">Todas</option>
                    {tiposNegociacao.map(({ id, nome }) => (
                      <option key={id} value={id}>{nome}</option>
                    ))}
                  </select>
                </Campo>

                <Campo rotulo="Quartos" id="filtro-quartos">
                  <select id="filtro-quartos" className={ESTILO_CAMPO} value={filtros.quartos} onChange={(e) => alterar("quartos", e.target.value)}>
                    <option value="">Qualquer</option>
                    {OPCOES_QUARTOS.map(({ valor, texto }) => (
                      <option key={valor} value={valor}>{texto}</option>
                    ))}
                  </select>
                </Campo>

                <Campo rotulo="Preço mínimo (R$)" id="filtro-preco-min">
                  <input
                    id="filtro-preco-min"
                    inputMode="numeric"
                    className={ESTILO_CAMPO}
                    placeholder="0"
                    value={filtros.precoMin}
                    onChange={(e) => alterar("precoMin", soDigitos(e.target.value))}
                  />
                </Campo>

                <Campo rotulo="Preço máximo (R$)" id="filtro-preco-max">
                  <input
                    id="filtro-preco-max"
                    inputMode="numeric"
                    className={ESTILO_CAMPO}
                    placeholder="Sem limite"
                    value={filtros.precoMax}
                    onChange={(e) => alterar("precoMax", soDigitos(e.target.value))}
                  />
                </Campo>

                <div className="col-span-2 flex items-end justify-end max-[639px]:col-span-1 max-[639px]:justify-stretch">
                  {filtrosAtivos && (
                    <button
                      type="button"
                      className="h-11 cursor-pointer rounded-md border border-[var(--color-dourado)] px-5 text-sm font-semibold text-[var(--color-texto)] transition-colors hover:bg-[var(--color-borda)] max-[639px]:w-full"
                      onClick={() => {
                        setFiltros(FILTROS_VAZIOS);
                        setVisiveis(POR_PAGINA);
                      }}
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>
            </form>

            <p className="mb-4 text-sm text-[var(--color-texto-suave)]" aria-live="polite">
              {filtrados.length === 1 ? "1 imóvel encontrado" : `${filtrados.length} imóveis encontrados`}
            </p>

            {filtrados.length === 0 ? (
              <p className="text-base text-[var(--color-texto-suave)]">
                Nenhum imóvel corresponde aos filtros escolhidos. Tente ampliar a busca.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-4 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1">
                {filtrados.slice(0, visiveis).map((imovel) => (
                  <CartaoImovel key={imovel.id} imovel={imovel} />
                ))}
              </div>
            )}

            {filtrados.length > visiveis && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="h-11 cursor-pointer rounded-md border border-[var(--color-dourado)] px-8 text-sm font-semibold text-[var(--color-texto)] transition-colors hover:bg-[var(--color-borda)]"
                  onClick={() => setVisiveis((atual) => atual + POR_PAGINA)}
                >
                  Mostrar mais imóveis
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Rodape />
    </div>
  );
}
