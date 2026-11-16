import { createContext, useContext, useEffect, useState } from "react";

import { observarUsuario } from "../services/authService";

const AuthContext = createContext({ usuario: null, carregando: true });

// Guarda quem está logado. `carregando` fica true até o Firebase dizer se há sessão salva.
export function AuthProvider({ children }) {
  const [estado, setEstado] = useState({ usuario: null, carregando: true });

  useEffect(() => observarUsuario((usuario) => setEstado({ usuario, carregando: false })), []);

  return <AuthContext.Provider value={estado}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
