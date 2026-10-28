import { Outlet, useNavigate } from "react-router-dom";

import Botao from "../comuns/Botao";
import Logomarca from "../comuns/Logomarca";
import "../../styles/tema-admin.css";
import "./LayoutAdmin.css";

// Moldura das telas internas do admin: cabeçalho fixo + a página da rota atual.
export default function LayoutAdmin() {
  const navigate = useNavigate();

  return (
    <div className="tema-admin layout-admin">
      <header className="layout-admin__cabecalho">
        <div className="layout-admin__conteudo layout-admin__barra">
          <div className="layout-admin__marca">
            <Logomarca largura={64} altura={46} />
            <div>
              <p className="layout-admin__nome">Kátia &amp; Renata</p>
              <p className="layout-admin__subtitulo">Painel de controle</p>
            </div>
          </div>

          <Botao variante="secundaria" tamanho="pequeno" onClick={() => navigate("/admin")}>
            Sair
          </Botao>
        </div>
      </header>

      <main className="layout-admin__conteudo layout-admin__pagina">
        <Outlet />
      </main>
    </div>
  );
}
