import "./Servicos.css";

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
    <section className="servicos" id="servicos" aria-labelledby="servicos-titulo">
      <div className="servicos__cabecalho">
        <p className="servicos__sobretitulo">Soluções integradas</p>
        <h2 className="servicos__titulo" id="servicos-titulo">
          Tudo o que seu<br className="servicos__quebra" /> patrimônio precisa.
        </h2>
      </div>

      <div className="servicos__lista">
        {servicos.map(({ numero, titulo, descricao }) => (
          <article className="servicos__item" key={numero} tabIndex={0}>
            <span className="servicos__marcador" aria-hidden="true" />
            <h3 className="servicos__nome">{titulo}</h3>
            <span className="servicos__divisor" aria-hidden="true" />
            <p className="servicos__descricao">{descricao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
