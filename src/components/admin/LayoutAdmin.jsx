import { Outlet, useNavigate } from "react-router-dom";

import Botao from "../comuns/Botao";
import Logomarca from "../comuns/Logomarca";

// Largura do conteúdo, igual no cabeçalho e na página
const CONTEUDO = "mx-auto w-[min(1120px,calc(100%-32px))]";

// Moldura das telas internas do admin: cabeçalho fixo + a página da rota atual.
export default function LayoutAdmin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-admin-fundo leading-[normal] text-admin-texto [color-scheme:dark]">
      <header className="border-b border-admin-borda">
        <div className={`${CONTEUDO} flex items-center justify-between gap-4 py-4`}>
          <div className="flex items-center gap-4 max-[480px]:gap-3">
            <Logomarca largura={64} altura={46} />
            <div>
              <p className="font-titulo text-[22px] font-medium uppercase tracking-[0.02em] max-[480px]:text-lg">
                Kátia &amp; Renata
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.04em] text-admin-destaque">
                Painel de controle
              </p>
            </div>
          </div>

          <Botao variante="secundaria" tamanho="pequeno" onClick={() => navigate("/admin")}>
            Sair
          </Botao>
        </div>
      </header>

      <main className={`${CONTEUDO} pt-10 pb-16 max-[480px]:pt-7`}>
        <Outlet />
      </main>
    </div>
  );
}
