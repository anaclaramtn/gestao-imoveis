import { useEffect } from "react";
import "./Modal.css";

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
    <div className="modal__fundo" onClick={onFechar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 id="modal-titulo" className="modal__titulo">{titulo}</h2>
        <div className="modal__conteudo">{children}</div>
        {acoes && <div className="modal__acoes">{acoes}</div>}
      </div>
    </div>
  );
}
