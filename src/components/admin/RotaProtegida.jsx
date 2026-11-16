import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

// Só mostra o conteúdo para quem está logado; os demais voltam para o login.
export default function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-fundo text-sm text-admin-texto-suave">
        Carregando...
      </div>
    );
  }

  return usuario ? children : <Navigate to="/admin" replace />;
}
