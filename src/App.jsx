import { useEffect, useState } from "react";
import "./App.css";
import { listarImoveis } from "./services/imovelService";

const formatadorDeMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function App() {
  const [imoveis, setImoveis] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarImoveis() {
      try {
        setImoveis(await listarImoveis());
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
        setErro("Não foi possível carregar os imóveis. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    }

    carregarImoveis();
  }, []);

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>Imóveis</h1>
        <p>Imóveis que estao no firebase!</p>
      </header>

      {carregando && <p className="estado">Carregando imóveis...</p>}
      {erro && <p className="estado estado--erro">{erro}</p>}

      {!carregando && !erro && imoveis.length === 0 && (
        <p className="estado">Nenhum imóvel publicado no momento.</p>
      )}

      {!carregando && !erro && imoveis.length > 0 && (
        <section className="imoveis" aria-label="Imóveis disponíveis">
          {imoveis.map((imovel) => (
            <article className="imovel" key={imovel.id}>
              <h2>{imovel.titulo}</h2>
              <p className="imovel__descricao">{imovel.descricao}</p>
              <p className="imovel__preco">
                {formatadorDeMoeda.format(imovel.preco)}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
