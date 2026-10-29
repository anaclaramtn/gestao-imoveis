// Triângulo de aviso dentro de um círculo vinho, usado no topo das janelas de alerta.
export default function IconeAviso() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-admin-erro-fundo text-admin-icone-acao">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </span>
  );
}
