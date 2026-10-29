import Header from "../../components/publico/Header";
import Credenciais from "../../components/publico/Credenciais";
import Hero from "../../components/publico/Hero";
import Apresentacao from "../../components/publico/Apresentacao";
import Servicos from "../../components/publico/Servicos";
import "./Home.css";

export default function Home() {
  return (
    <div className="pagina-inicial">
      <Header />
      <main className="pt-20">
        <Hero />
        <Credenciais />
        <Apresentacao />
        <Servicos />
      </main>
    </div>
  );
}
