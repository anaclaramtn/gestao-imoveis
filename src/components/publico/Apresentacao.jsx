import katia from "../../assets/katia.png";
import renata from "../../assets/renata.png";

export default function Apresentacao() {
  return (
    <section
      className="mx-auto grid min-h-[100vh] supports-[height:100svh]:min-h-[100svh] max-w-[90rem] grid-cols-[minmax(18rem,0.92fr)_minmax(0,1.08fr)] items-center gap-[clamp(2rem,5.5vw,4.5rem)] bg-[var(--color-fundo)] px-[clamp(1.25rem,5vw,2.5rem)] py-[clamp(3rem,7vh,5rem)] max-[767px]:grid-cols-[minmax(0,1fr)] max-[767px]:content-center max-[767px]:gap-7 max-[767px]:py-12"
      aria-labelledby="apresentacao-titulo"
    >
      <div
        className="grid min-w-0 grid-cols-2 gap-2 max-[767px]:max-w-96"
        aria-label="Kátia e Renata"
      >
        <img
          className="block h-[clamp(17rem,36vw,25rem)] w-full rounded-lg object-cover object-[center_30%] transition-[filter,transform,box-shadow] duration-[180ms] hover:scale-[1.025] hover:brightness-[1.08] hover:saturate-[1.05] hover:shadow-[0_0.75rem_1.75rem_rgba(0,0,0,0.30)] motion-reduce:transition-none motion-reduce:hover:scale-100 max-[767px]:h-[clamp(15rem,66vw,21rem)]"
          src={katia}
          alt="Kátia, corretora de imóveis"
        />
        <img
          className="block h-[clamp(17rem,36vw,25rem)] w-full rounded-lg object-cover object-[center_25%] transition-[filter,transform,box-shadow] duration-[180ms] hover:scale-[1.025] hover:brightness-[1.08] hover:saturate-[1.05] hover:shadow-[0_0.75rem_1.75rem_rgba(0,0,0,0.30)] motion-reduce:transition-none motion-reduce:hover:scale-100 max-[767px]:h-[clamp(15rem,66vw,21rem)]"
          src={renata}
          alt="Renata, corretora de imóveis"
        />
      </div>

      <div className="min-w-0">
        <p className="mb-[0.85rem] table rounded-full border border-[rgb(168_25_54_/_30%)] bg-[rgb(168_25_54_/_12%)] px-2 py-1 text-[0.55rem] leading-[1.2] font-bold tracking-[0.035em] text-[var(--color-rosa)] uppercase">
          Duas especialistas, um só propósito
        </p>
        <h2
          className="m-0 max-w-[31rem] font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] font-medium text-[var(--color-texto)] [text-wrap:balance] max-[767px]:text-[clamp(2rem,9vw,2.75rem)]"
          id="apresentacao-titulo"
        >
          Negociações conduzidas com presença e precisão.
        </h2>
        <span
          className="my-[1.1rem] block h-0.5 w-[1.7rem] bg-[var(--color-rosa)]"
          aria-hidden="true"
        />
        <p className="m-0 max-w-[34rem] text-[0.72rem] leading-[1.75] text-[#968b88] max-[767px]:text-[0.82rem]">
          Mais do que intermediar imóveis, acompanhamos histórias. Da primeira
          visita à assinatura, cada escolha recebe estratégia, transparência e
          uma curadoria verdadeiramente pessoal.
        </p>
        <p className="mt-[1.3rem] mb-0 font-serif text-[1.05rem] italic text-[var(--color-rosa)]">
          Kátia &amp; Renata
        </p>
      </div>
    </section>
  );
}
