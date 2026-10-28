import "./Seletor.css";

// Caixa de seleção (dropdown) com o visual do admin.
// opcoes: [{ valor: "todos", texto: "Todos os status" }, ...]
export default function Seletor({ opcoes, className = "", ...propsDoSelect }) {
  return (
    <div className={`seletor ${className}`}>
      <select className="seletor__select" {...propsDoSelect}>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>

      <svg className="seletor__seta" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
