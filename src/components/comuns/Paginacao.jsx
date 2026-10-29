import Seletor from "./Seletor";

const OPCOES_POR_PAGINA = [5, 10, 20, 50].map((n) => ({ valor: n, texto: `${n} por página` }));

const ESTILO_BOTAO =
  "h-[30px] min-w-[30px] cursor-pointer rounded border px-2 text-xs text-admin-texto disabled:cursor-not-allowed disabled:opacity-40";

// Cada estado tem suas próprias cores (duas classes de fundo no mesmo botão brigariam entre si)
const ESTILO_BOTAO_NORMAL = "border-admin-borda bg-transparent enabled:hover:border-admin-borda-foco";
const ESTILO_BOTAO_ATIVO = "border-admin-primaria bg-admin-primaria font-bold";

const RETICENCIAS = "…";

/*
  Decide quais números aparecem. Até 7 páginas, mostra todas.
  Acima disso, sempre mostra 7 posições (para os botões não "pularem" de lugar):
    início: 1 2 3 4 5 … 10
    meio:   1 … 4 5 6 … 10
    fim:    1 … 6 7 8 9 10
*/
function gerarPaginas(atual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (atual <= 4) return [1, 2, 3, 4, 5, RETICENCIAS, total];
  if (atual >= total - 3) return [1, RETICENCIAS, total - 4, total - 3, total - 2, total - 1, total];
  return [1, RETICENCIAS, atual - 1, atual, atual + 1, RETICENCIAS, total];
}

// Botões de página (‹ 1 2 3 … 10 ›) + seletor de quantos itens mostrar por página.
export default function Paginacao({ paginaAtual, totalPaginas, porPagina, onMudarPagina, onMudarPorPagina }) {
  const paginas = gerarPaginas(paginaAtual, totalPaginas);

  return (
    <nav className="flex flex-wrap items-center gap-3" aria-label="Paginação">
      <Seletor
        tamanho="pequeno"
        direcao="cima"
        aria-label="Itens por página"
        opcoes={OPCOES_POR_PAGINA}
        value={porPagina}
        onChange={onMudarPorPagina}
      />

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          className={`${ESTILO_BOTAO} ${ESTILO_BOTAO_NORMAL}`}
          onClick={() => onMudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {paginas.map((pagina, indice) =>
          pagina === RETICENCIAS ? (
            <span
              key={`reticencias-${indice}`}
              className="flex h-[30px] min-w-[30px] items-end justify-center pb-1.5 text-xs text-admin-texto-suave"
              aria-hidden="true"
            >
              {RETICENCIAS}
            </span>
          ) : (
            <button
              key={pagina}
              type="button"
              className={`${ESTILO_BOTAO} ${pagina === paginaAtual ? ESTILO_BOTAO_ATIVO : ESTILO_BOTAO_NORMAL}`}
              onClick={() => onMudarPagina(pagina)}
              aria-label={`Página ${pagina}`}
              aria-current={pagina === paginaAtual ? "page" : undefined}
            >
              {pagina}
            </button>
          ),
        )}

        <button
          type="button"
          className={`${ESTILO_BOTAO} ${ESTILO_BOTAO_NORMAL}`}
          onClick={() => onMudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          aria-label="Próxima página"
        >
          ›
        </button>
      </div>
    </nav>
  );
}
