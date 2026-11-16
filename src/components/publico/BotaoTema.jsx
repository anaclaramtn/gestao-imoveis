import { useTema } from "../../hooks/useTema";

// Alterna entre modo claro e escuro (fica no canto superior direito do cabeçalho).
export default function BotaoTema() {
  const [tema, alternar] = useTema();
  const claro = tema === "claro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={claro ? "Ativar modo escuro" : "Ativar modo claro"}
      title={claro ? "Modo escuro" : "Modo claro"}
      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded border border-white/20 text-white transition-colors hover:border-[#d99a72] hover:text-[#d99a72] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99a72]"
    >
      {claro ? (
        // Lua: no modo claro, o clique leva ao escuro
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        // Sol: no modo escuro, o clique leva ao claro
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
