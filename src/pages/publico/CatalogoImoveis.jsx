import Header from "../../components/publico/Header";
import Imoveis from "../../components/publico/Imoveis";

export default function CatalogoImoveis() {
  return (
    <div className="min-h-screen bg-[var(--color-fundo)] text-[var(--color-texto)]">
      <Header />
      <main className="pt-20">
        <Imoveis />
      </main>
    </div>
  );
}
