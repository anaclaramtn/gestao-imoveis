// Bloco exibido no lugar de uma lista quando não há nada para mostrar.
export default function EstadoVazio({ titulo, descricao, children }) {
  return (
    <div className="flex flex-col items-center rounded-admin-cartao border border-admin-borda bg-admin-superficie px-6 pt-14 pb-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-admin-borda bg-admin-fundo text-admin-destaque">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <path d="M10 21v-6h4v6" />
        </svg>
      </div>
      <h2 className="mb-1.5 font-titulo text-[26px] font-medium">{titulo}</h2>
      <p className="mb-5 text-[13px] text-admin-texto-suave">{descricao}</p>
      {children}
    </div>
  );
}
