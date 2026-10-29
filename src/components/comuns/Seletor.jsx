const ESTILO_TAMANHO = {
  normal: "h-10 text-[13px]",
  pequeno: "h-[30px] text-xs",
};

// Caixa de seleção (dropdown) com o visual do admin.
// opcoes: [{ valor: "todos", texto: "Todos os status" }, ...]
// tamanho: "normal" ou "pequeno"
export default function Seletor({ opcoes, tamanho = "normal", className = "", ...propsDoSelect }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <select
        className={`w-full cursor-pointer appearance-none rounded-admin border border-admin-borda bg-admin-campo pr-9 pl-3 text-admin-texto outline-none focus-visible:border-admin-borda-foco ${ESTILO_TAMANHO[tamanho]}`}
        {...propsDoSelect}
      >
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>

      <svg className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-admin-texto-suave" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
