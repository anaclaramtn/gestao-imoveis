import { Link } from "react-router-dom";

import { useImoveisPublicados } from "../../hooks/useImoveisPublicados";
import { useRevelarAoRolar } from "../../hooks/useRevelarAoRolar";
import CabecalhoSecao from "./CabecalhoSecao";
import CartaoImovel from "./CartaoImovel";

// Seção da Home com os 3 imóveis publicados mais recentes. Some se não houver nenhum.
export default function ImoveisDestaque() {
  const { imoveis } = useImoveisPublicados();
  const [cadeia, visivel] = useRevelarAoRolar(imoveis.length > 0);
  if (imoveis.length === 0) return null;

  return (
    <section
      className="bg-[var(--color-secao)] px-[clamp(1.25rem,5vw,2.5rem)] py-[clamp(3.5rem,8vh,6rem)]"
      id="imoveis"
      aria-labelledby="imoveis-titulo"
    >
      <CabecalhoSecao selo="Seleção exclusiva" id="imoveis-titulo" titulo="Imóveis em destaque">
        <Link to="/imoveis" className="text-sm font-semibold text-[var(--color-dourado)] hover:text-[var(--color-texto)]">
          Ver todos os imóveis →
        </Link>
      </CabecalhoSecao>

      <div
        ref={cadeia}
        data-cadeia
        data-visivel={visivel}
        className="mx-auto grid w-full max-w-[81rem] grid-cols-3 gap-5 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1"
      >
        {imoveis.slice(0, 3).map((imovel, indice) => (
          <div key={imovel.id} style={{ "--i": indice }}>
            <CartaoImovel imovel={imovel} />
          </div>
        ))}
      </div>
    </section>
  );
}
