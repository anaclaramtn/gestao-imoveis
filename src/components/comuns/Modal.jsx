import { useEffect } from "react";

/*
  Janela no centro da tela, com fundo escurecido.
  Fecha ao clicar fora, ao apertar Esc ou pelos botões passados em "acoes".
    icone: elemento opcional exibido ao lado do título
    acoes: botões do rodapé. No celular (até 480px) eles ocupam a largura toda
           e são empilhados em ordem invertida (o último botão fica em cima).
*/
export default function Modal({ titulo, icone, children, acoes, onFechar }) {
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
        className="w-full max-w-[420px] rounded-admin-cartao border border-admin-borda bg-admin-superficie p-7 shadow-[0_24px_48px_rgb(0_0_0/60%)] max-[480px]:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="mb-5 flex items-center gap-3">
          {icone}
          <h2 id="modal-titulo" className="font-titulo text-2xl font-medium">{titulo}</h2>
        </div>

        <div className="text-sm leading-normal text-admin-texto-suave">{children}</div>

        {acoes && (
          <div className="mt-7 flex justify-end gap-3 max-[480px]:flex-col-reverse max-[480px]:*:h-11 max-[480px]:*:w-full">
            {acoes}
          </div>
        )}
      </div>
    </div>
  );
}
