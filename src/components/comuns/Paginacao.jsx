import Seletor from "./Seletor";
import "./Paginacao.css";

const OPCOES_POR_PAGINA = [5, 10, 20, 50].map((n) => ({ valor: n, texto: `${n} por página` }));

// Botões de página (1, 2, 3, ›) + seletor de quantos itens mostrar por página.
export default function Paginacao({ paginaAtual, totalPaginas, porPagina, onMudarPagina, onMudarPorPagina }) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="paginacao" aria-label="Paginação">
      <Seletor
        className="paginacao__por-pagina"
        aria-label="Itens por página"
        opcoes={OPCOES_POR_PAGINA}
        value={porPagina}
        onChange={(e) => onMudarPorPagina(Number(e.target.value))}
      />

      <div className="paginacao__paginas">
        <button
          type="button"
          className="paginacao__botao"
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
            className={`paginacao__botao ${pagina === paginaAtual ? "paginacao__botao--ativo" : ""}`}
            onClick={() => onMudarPagina(pagina)}
            aria-current={pagina === paginaAtual ? "page" : undefined}
          >
            {pagina}
          </button>
        ))}

        <button
          type="button"
          className="paginacao__botao"
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
