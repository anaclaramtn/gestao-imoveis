import { formatadorDeMoeda } from "../../utils/formatadores";
import EtiquetaStatus from "./EtiquetaStatus";
import "./LinhaImovel.css";

// Uma linha da tabela de imóveis. Recebe o objeto do imóvel (hoje dos dados
// de exemplo, depois do Firestore) e avisa a página quando editar/excluir é clicado.
export default function LinhaImovel({ imovel, onEditar, onExcluir }) {
  const preco = formatadorDeMoeda.format(imovel.preco);

  return (
    <tr className="linha-imovel">
      <td className="linha-imovel__foto">
        {imovel.foto ? (
          <img src={imovel.foto} alt="" />
        ) : (
          <div className="linha-imovel__sem-foto">Foto</div>
        )}
      </td>

      <td className="linha-imovel__imovel">
        <strong>{imovel.titulo}</strong>
        <span>{imovel.tipo} · {imovel.localizacao}</span>
      </td>

      <td className="linha-imovel__codigo">{imovel.codigo}</td>

      <td className="linha-imovel__preco">
        {preco}
        {imovel.finalidade === "aluguel" && "/mês"}
      </td>

      <td className="linha-imovel__status">
        <EtiquetaStatus publicado={imovel.publicado} />
      </td>

      <td className="linha-imovel__acoes">
        <button type="button" className="linha-imovel__acao" onClick={() => onEditar(imovel)} aria-label={`Editar ${imovel.titulo}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
          </svg>
        </button>

        <button type="button" className="linha-imovel__acao" onClick={() => onExcluir(imovel)} aria-label={`Excluir ${imovel.titulo}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
