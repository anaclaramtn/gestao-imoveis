// Título padrão das seções da Home: selo pequeno + título grande (+ conteúdo opcional à direita).
export default function CabecalhoSecao({ selo, titulo, id, children }) {
  return (
    <div className="mx-auto mb-10 flex w-full max-w-[81rem] flex-wrap items-end justify-between gap-4 max-[767px]:mb-7">
      <div>
        <p className="mb-4 table rounded-full border border-[rgb(168_25_54_/_30%)] bg-[rgb(168_25_54_/_12%)] px-3 py-1.5 text-xs leading-[1.2] font-bold tracking-[0.06em] text-[var(--color-rosa)] uppercase">
          {selo}
        </p>
        <h2
          id={id}
          className="m-0 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] font-medium text-[var(--color-texto)] [text-wrap:balance]"
        >
          {titulo}
        </h2>
      </div>
      {children}
    </div>
  );
}
