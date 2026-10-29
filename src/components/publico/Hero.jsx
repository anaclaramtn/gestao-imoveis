import { Link } from "react-router-dom";
import imagemDesktop from "../../assets/hero-home-desktop.png";

const whatsapp = "https://wa.me/5585987823726";

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[clamp(36rem,52.1vw,48.5rem)] scroll-mt-[5.5rem] overflow-hidden bg-[var(--color-fundo)] max-[767px]:min-h-[38rem] max-[767px]:flex-col max-[767px]:justify-center max-[767px]:px-5 max-[767px]:py-12"
      id="hero"
      aria-labelledby="hero-titulo"
    >
      <img
        className="absolute inset-0 z-[-2] h-full w-full object-cover object-[center_52%] max-[767px]:object-[62%_center]"
        src={imagemDesktop}
        alt=""
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[-1] w-[min(50.9vw,45.8rem)] bg-[linear-gradient(90deg,rgba(4,2,3,0.96)_0%,rgba(4,2,3,0.8)_55%,rgba(4,2,3,0)_100%)] max-[767px]:inset-0 max-[767px]:w-auto max-[767px]:bg-[linear-gradient(90deg,rgba(4,2,3,0.94)_0%,rgba(4,2,3,0.77)_70%,rgba(4,2,3,0.5)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-[18.75rem] bg-[linear-gradient(158deg,transparent_34%,rgba(4,2,3,0.8)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[1] w-[min(44.125rem,65vw)] pt-[clamp(6rem,9.72vw,8.75rem)] pb-16 pl-[clamp(2rem,5vw,4.5rem)] max-[767px]:w-full max-[767px]:p-0 md:max-lg:w-[min(70vw,44.125rem)]">
        <div className="flex w-[min(100%,39.125rem)] flex-col items-start gap-5 max-[767px]:w-full max-[767px]:gap-[1.125rem]">
          <p className="m-0 rounded-full border border-[rgb(168_25_54_/_33%)] bg-[rgb(168_25_54_/_13%)] px-3.5 py-1.5 text-[0.625rem] leading-[1.2] font-bold text-[var(--color-rosa)] uppercase max-[767px]:px-3">
            Imóveis com visão, cuidado e segurança
          </p>
          <h1
            className="m-0 max-w-full font-serif text-[clamp(3rem,5.14vw,4.625rem)] leading-[0.93] font-medium text-[var(--color-texto)] [text-wrap:pretty] max-[767px]:w-full max-[767px]:text-[clamp(2.5rem,8vw,3.5rem)] max-[767px]:leading-[0.98] md:max-lg:text-[clamp(3rem,6vw,4rem)]"
            id="hero-titulo"
          >
            Seu próximo imóvel começa com um atendimento de confiança!
          </h1>
          <p className="m-0 w-[min(100%,33.75rem)] text-[0.9375rem] leading-[1.7] text-[#c8b8b3] max-[767px]:w-full max-[767px]:leading-[1.65]">
            Kátia &amp; Renata unem leitura de mercado, atendimento próximo e suporte jurídico
            para transformar decisões imobiliárias em conquistas seguras.
          </p>
          <div className="flex flex-wrap items-center gap-3 max-[767px]:w-full max-[767px]:flex-col max-[767px]:items-stretch">
            <Link
              className="inline-flex min-h-[2.875rem] items-center justify-center rounded-md border border-transparent bg-[var(--color-primaria)] px-7 py-3.5 text-center text-[0.8125rem] leading-[1.2] font-semibold text-[var(--color-texto)] no-underline transition-[background-color,border-color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[#c21f3d] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-dourado)] max-[767px]:w-full max-[767px]:px-6 md:max-lg:px-[clamp(1rem,2.5vw,1.75rem)]"
              to="/imoveis"
            >
              Explorar todos os imóveis
            </Link>
            <a
              className="inline-flex min-h-[2.875rem] items-center justify-center rounded-md border border-[rgb(217_154_114_/_60%)] bg-[rgb(255_255_255_/_5%)] px-7 py-3.5 text-center text-[0.8125rem] leading-[1.2] font-semibold text-[var(--color-texto)] no-underline transition-[background-color,border-color,transform] duration-[160ms] hover:-translate-y-px hover:bg-[rgb(255_255_255_/_11%)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-dourado)] max-[767px]:w-full max-[767px]:px-6 md:max-lg:px-[clamp(1rem,2.5vw,1.75rem)]"
              href={whatsapp}
            >
              Falar com as corretoras
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
