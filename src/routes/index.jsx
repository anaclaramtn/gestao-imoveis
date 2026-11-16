import { createBrowserRouter } from "react-router-dom";

import LayoutAdmin from "../components/admin/LayoutAdmin";
import RotaProtegida from "../components/admin/RotaProtegida";
import DetalheImovel from "../pages/publico/DetalheImovel";
import Home from "../pages/publico/Home";
import Imoveis from "../pages/publico/Imoveis";
import FormularioImovel from "../pages/admin/FormularioImovel";
import ListaImoveis from "../pages/admin/ListaImoveis";
import LoginAdmin from "../pages/admin/LoginAdmin";
import PaginaNaoEncontrada from "../pages/admin/PaginaNaoEncontrada";

// Mapa de todas as URLs do site e a página que cada uma exibe.
export const router = createBrowserRouter([
  // Área pública
  {
    path: "/",
    element: <Home />,
  },
  { path: "/imoveis", element: <Imoveis /> },
  { path: "/imoveis/:id", element: <DetalheImovel /> },

  // Área de administração: todas as rotas começam com /admin
  {
    path: "/admin",
    children: [
      // Login fica fora do layout (não tem o cabeçalho do painel)
      { index: true, element: <LoginAdmin /> }, // /admin

      // Telas internas: todas aparecem dentro do LayoutAdmin (cabeçalho + conteúdo)
      {
        element: (
          <RotaProtegida>
            <LayoutAdmin />
          </RotaProtegida>
        ),
        children: [
          { path: "painel", element: <ListaImoveis /> }, // /admin/painel
          { path: "imoveis/novo", element: <FormularioImovel /> }, // /admin/imoveis/novo
          { path: "imoveis/:id/editar", element: <FormularioImovel /> }, // /admin/imoveis/3/editar
        ],
      },

      // Qualquer outro endereço dentro de /admin: "*" significa "o que não combinou acima"
      { path: "*", element: <PaginaNaoEncontrada /> }, // /admin/qualquercoisa
    ],
  },
]);
