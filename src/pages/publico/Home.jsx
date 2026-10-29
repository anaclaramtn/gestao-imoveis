import Header from "../../components/publico/Header";
import Credenciais from "../../components/publico/Credenciais";
import Hero from "../../components/publico/Hero";
import "./Home.css";

export default function Home() {
  return (
    <div className="pagina-inicial">
      <Header />
      <main>
        <Hero />
        <Credenciais />
      </main>
    </div>
  );
}
