import { useEffect } from "react";

// Janela no centro da tela, com fundo escurecido.
// Fecha ao clicar fora, ao apertar Esc ou pelos botões passados em "acoes".
export default function Modal({ titulo, children, acoes, onFechar }) {
  useEffect(() => {
    function fecharComEsc(evento) {
      if (evento.key === "Escape") onFechar();
    }

    document.addEventListener("keydown", fecharComEsc);
    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [onFechar]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4" onClick={onFechar}>
      <div
        className="w-full max-w-[420px] rounded-admin-cartao border border-admin-borda bg-admin-superficie p-7 shadow-[0_24px_48px_rgb(0_0_0/60%)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 id="modal-titulo" className="mb-3 font-titulo text-2xl font-medium">{titulo}</h2>
        <div className="text-sm leading-normal text-admin-texto-suave">{children}</div>
        {acoes && <div className="mt-6 flex justify-end gap-2">{acoes}</div>}
      </div>
    </div>
  );
}
