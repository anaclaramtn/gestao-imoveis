import { Link } from "react-router-dom";
import imagemDesktop from "../../assets/hero-home-desktop.png";
import "./Hero.css";

const whatsapp = "https://wa.me/5585987823726";

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-titulo">
      <img className="hero__imagem" src={imagemDesktop} alt="" aria-hidden="true" />

      <div className="hero__conteudo">
        <div className="hero__texto">
          <p className="hero__etiqueta">Imóveis com visão, cuidado e segurança</p>
          <h1 className="hero__titulo" id="hero-titulo">
            Seu próximo imóvel começa com um atendimento de confiança!
          </h1>
          <p className="hero__descricao">
            Kátia &amp; Renata unem leitura de mercado, atendimento próximo e suporte jurídico
            para transformar decisões imobiliárias em conquistas seguras.
          </p>
          <div className="hero__acoes">
            <Link className="hero__botao hero__botao--primario" to="/imoveis">
              Explorar todos os imóveis
            </Link>
            <a className="hero__botao hero__botao--secundario" href={whatsapp}>
              Falar com as corretoras
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
