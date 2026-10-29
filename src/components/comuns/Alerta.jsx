// Caixa de mensagem de erro com ícone de aviso.
export default function Alerta({ children }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-admin border border-admin-erro bg-admin-erro-fundo px-3 py-2 text-[13px] text-admin-texto"
      role="alert"
    >
      <svg className="shrink-0 text-admin-erro" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
