// Mostra "Publicado" (verde) ou "Rascunho" (cinza) a partir do campo publicado.
export default function EtiquetaStatus({ publicado }) {
  return (
    <span
      className={`inline-block rounded-full border border-current px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] whitespace-nowrap ${
        publicado ? "text-admin-sucesso" : "text-admin-texto-suave"
      }`}
    >
      {publicado ? "Publicado" : "Rascunho"}
    </span>
  );
}
