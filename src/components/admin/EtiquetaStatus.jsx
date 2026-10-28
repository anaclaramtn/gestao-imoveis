import "./EtiquetaStatus.css";

// Mostra "Publicado" (verde) ou "Rascunho" (cinza) a partir do campo publicado.
export default function EtiquetaStatus({ publicado }) {
  return (
    <span className={`etiqueta-status ${publicado ? "etiqueta-status--publicado" : ""}`}>
      {publicado ? "Publicado" : "Rascunho"}
    </span>
  );
}
