const servicos = [
  {
    numero: "01",
    titulo: "Compra",
    descricao: "Curadoria e negociação do imóvel ideal.",
  },
  {
    numero: "02",
    titulo: "Venda",
    descricao: "Posicionamento, divulgação e condução segura.",
  },
  {
    numero: "03",
    titulo: "Aluguel",
    descricao: "Agilidade para proprietários e locatários.",
  },
  {
    numero: "04",
    titulo: "Regularização imobiliária",
    descricao: "Documentação analisada do início ao fim.",
  },
  {
    numero: "05",
    titulo: "Assessoria jurídica",
    descricao: "Suporte especializado para decisões tranquilas.",
  },
];

export default function Servicos() {
  return (
    <section
      className="flex min-h-[72vh] supports-[height:100svh]:min-h-[72svh] flex-col justify-center bg-[#0d0b0c] px-[clamp(1.25rem,5vw,2.5rem)] py-[clamp(1.5rem,3.5vh,2.75rem)] max-[767px]:min-h-0"
      id="servicos"
      aria-labelledby="servicos-titulo"
    >
      <div className="mx-auto mb-7 w-full max-w-[81rem] max-[767px]:mb-5">
        <p className="mb-[0.85rem] table rounded-full border border-[rgb(168_25_54_/_30%)] bg-[rgb(168_25_54_/_12%)] px-2 py-1 text-[0.55rem] leading-[1.2] font-bold tracking-[0.035em] text-[var(--color-rosa)] uppercase">
          Soluções integradas
        </p>
        <h2
          className="m-0 font-serif text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.03] font-medium text-[var(--color-texto)] [text-wrap:balance]"
          id="servicos-titulo"
        >
          Tudo o que seu<br className="max-[767px]:hidden" /> patrimônio precisa.
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-[81rem] grid-cols-5 gap-2 max-[1023px]:grid-cols-3 max-[767px]:grid-cols-1 max-[767px]:gap-3">
        {servicos.map(({ numero, titulo, descricao }) => (
          <article
            className="min-h-[7.75rem] min-w-0 rounded-[0.45rem] border border-[rgb(90_52_61_/_30%)] bg-[rgb(26_21_23_/_42%)] p-[1.2rem_0.9rem] transition-[transform,border-color,background-color,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:border-[rgb(230_51_120_/_60%)] hover:bg-[rgb(90_52_61_/_24%)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.24),0_0_18px_rgba(230,51,120,0.07)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-rosa)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[767px]:grid max-[767px]:min-h-[4.5rem] max-[767px]:w-full max-[767px]:grid-cols-[0.75rem_minmax(0,0.8fr)_minmax(0,1.2fr)] max-[767px]:items-center max-[767px]:gap-x-[0.6rem] max-[767px]:p-[0.7rem_0.75rem]"
            key={numero}
            tabIndex={0}
          >
            <span
              className="mb-[1.2rem] block h-[0.2rem] w-[0.2rem] rounded-full bg-[var(--color-rosa)] max-[767px]:m-0 max-[767px]:justify-self-center"
              aria-hidden="true"
            />
            <h3 className="m-0 font-serif text-[clamp(0.85rem,1.2vw,1rem)] leading-[1.2] font-medium text-[#e9dfdc] [text-wrap:balance] max-[767px]:text-[0.95rem]">
              {titulo}
            </h3>
            <span
              className="my-[0.6rem] block h-px w-5 bg-[rgb(217_154_114_/_35%)] max-[767px]:hidden"
              aria-hidden="true"
            />
            <p className="m-0 text-[0.61rem] leading-[1.55] text-[#817674] max-[767px]:text-[0.66rem]">
              {descricao}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
