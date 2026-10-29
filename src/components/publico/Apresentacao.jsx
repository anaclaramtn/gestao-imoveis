import katia from "../../assets/katia.png";
import renata from "../../assets/renata.png";
import "./Apresentacao.css";

export default function Apresentacao() {
  return (
    <section className="apresentacao" aria-labelledby="apresentacao-titulo">
      <div className="apresentacao__retratos" aria-label="Kátia e Renata">
        <img className="apresentacao__retrato apresentacao__retrato--katia" src={katia} alt="Kátia, corretora de imóveis" />
        <img className="apresentacao__retrato apresentacao__retrato--renata" src={renata} alt="Renata, corretora de imóveis" />
      </div>

      <div className="apresentacao__conteudo">
        <p className="apresentacao__sobretitulo">Duas especialistas, um só propósito</p>
        <h2 className="apresentacao__titulo" id="apresentacao-titulo">
          Negociações conduzidas com presença e precisão.
        </h2>
        <span className="apresentacao__traco" aria-hidden="true" />
        <p className="apresentacao__texto">
          Mais do que intermediar imóveis, acompanhamos histórias. Da primeira
          visita à assinatura, cada escolha recebe estratégia, transparência e
          uma curadoria verdadeiramente pessoal.
        </p>
        <p className="apresentacao__assinatura">Kátia &amp; Renata</p>
      </div>
    </section>
  );
}
