import Seletor from "./Seletor";

const OPCOES_POR_PAGINA = [5, 10, 20, 50].map((n) => ({ valor: n, texto: `${n} por página` }));

const ESTILO_BOTAO =
  "h-[30px] min-w-[30px] cursor-pointer rounded border px-2 text-xs text-admin-texto disabled:cursor-not-allowed disabled:opacity-40";

// Cada estado tem suas próprias cores (duas classes de fundo no mesmo botão brigariam entre si)
const ESTILO_BOTAO_NORMAL = "border-admin-borda bg-transparent enabled:hover:border-admin-borda-foco";
const ESTILO_BOTAO_ATIVO = "border-admin-primaria bg-admin-primaria font-bold";

// Botões de página (1, 2, 3, ›) + seletor de quantos itens mostrar por página.
export default function Paginacao({ paginaAtual, totalPaginas, porPagina, onMudarPagina, onMudarPorPagina }) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="flex flex-wrap items-center gap-3" aria-label="Paginação">
      <Seletor
        tamanho="pequeno"
        aria-label="Itens por página"
        opcoes={OPCOES_POR_PAGINA}
        value={porPagina}
        onChange={(e) => onMudarPorPagina(Number(e.target.value))}
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

        {paginas.map((pagina) => (
          <button
            key={pagina}
            type="button"
            className={`${ESTILO_BOTAO} ${pagina === paginaAtual ? ESTILO_BOTAO_ATIVO : ESTILO_BOTAO_NORMAL}`}
            onClick={() => onMudarPagina(pagina)}
            aria-current={pagina === paginaAtual ? "page" : undefined}
          >
            {pagina}
          </button>
        ))}

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
