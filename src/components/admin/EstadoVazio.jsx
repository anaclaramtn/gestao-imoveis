import "./EstadoVazio.css";

// Bloco exibido no lugar de uma lista quando não há nada para mostrar.
export default function EstadoVazio({ titulo, descricao, children }) {
  return (
    <div className="estado-vazio">
      <div className="estado-vazio__icone">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <path d="M10 21v-6h4v6" />
        </svg>
      </div>
      <h2 className="estado-vazio__titulo">{titulo}</h2>
      <p className="estado-vazio__descricao">{descricao}</p>
      {children}
    </div>
  );
}
