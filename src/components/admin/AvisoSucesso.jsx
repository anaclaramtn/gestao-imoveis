import { useEffect } from "react";

const TEMPO_NA_TELA = 6000; // milissegundos

// Faixa verde de confirmação (ex.: "Imóvel salvo com sucesso!").
// Some sozinha depois de alguns segundos, ou ao clicar no ×.
export default function AvisoSucesso({ children, onFechar }) {
  useEffect(() => {
    const temporizador = setTimeout(onFechar, TEMPO_NA_TELA);
    return () => clearTimeout(temporizador);
  }, [onFechar]);

  return (
    <div
      role="status"
      className="mb-6 flex items-center gap-3 rounded-admin border border-admin-sucesso/40 bg-admin-sucesso-fundo px-4 py-3 text-[13px] font-semibold"
    >
      <svg className="shrink-0 text-admin-sucesso" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="8 12 11 15 16 9" />
      </svg>
      <span className="flex-1">{children}</span>
      <button
        type="button"
        className="cursor-pointer text-lg leading-none text-admin-texto-suave hover:text-admin-texto"
        onClick={onFechar}
        aria-label="Fechar aviso"
      >
        ×
      </button>
    </div>
  );
}
