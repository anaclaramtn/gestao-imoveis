import { useRevelarAoRolar } from "../../hooks/useRevelarAoRolar";
import CabecalhoSecao from "./CabecalhoSecao";

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
  const [cadeia, visivel] = useRevelarAoRolar();

  return (
    <section
      className="bg-[var(--color-fundo)] px-[clamp(1.25rem,5vw,2.5rem)] py-[clamp(3.5rem,8vh,6rem)]"
      id="servicos"
      aria-labelledby="servicos-titulo"
    >
      <CabecalhoSecao
        selo="Soluções integradas"
        id="servicos-titulo"
        titulo={
          <>
            Tudo o que seu<br className="max-[767px]:hidden" /> patrimônio precisa.
          </>
        }
      />

      <div
        ref={cadeia}
        data-cadeia
        data-visivel={visivel}
        className="mx-auto grid w-full max-w-[81rem] grid-cols-5 gap-3 max-[1023px]:grid-cols-3 max-[767px]:grid-cols-1"
      >
        {servicos.map(({ numero, titulo, descricao }, indice) => (
          <article
            className="min-h-[10rem] min-w-0 rounded-[0.45rem] border border-[var(--color-borda)] bg-[var(--color-cartao)] p-5 transition-[transform,border-color,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:border-[var(--color-rosa)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-rosa)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[767px]:grid max-[767px]:min-h-[5rem] max-[767px]:w-full max-[767px]:grid-cols-[0.75rem_minmax(0,0.8fr)_minmax(0,1.2fr)] max-[767px]:items-center max-[767px]:gap-x-[0.6rem] max-[767px]:p-[0.9rem_0.85rem]"
            key={numero}
            style={{ "--i": indice }}
            tabIndex={0}
          >
            <span
              className="mb-5 block h-1 w-1 rounded-full bg-[var(--color-rosa)] max-[767px]:m-0 max-[767px]:justify-self-center"
              aria-hidden="true"
            />
            <h3 className="m-0 font-serif text-lg leading-[1.2] font-medium text-[var(--color-texto)] [text-wrap:balance]">
              {titulo}
            </h3>
            <span
              className="my-3 block h-px w-5 bg-[var(--color-dourado)] opacity-40 max-[767px]:hidden"
              aria-hidden="true"
            />
            <p className="m-0 text-sm leading-[1.55] text-[var(--color-texto-mudo)]">{descricao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
