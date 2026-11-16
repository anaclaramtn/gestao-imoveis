import { useEffect, useState } from "react";

import { listarImoveisPublicados } from "../services/imovelService";

// Carrega os imóveis publicados para as telas públicas.
export function useImoveisPublicados() {
  const [estado, setEstado] = useState({ imoveis: [], carregando: true, erro: false });

  useEffect(() => {
    let ativo = true;
    listarImoveisPublicados()
      .then((imoveis) => ativo && setEstado({ imoveis, carregando: false, erro: false }))
      .catch(() => ativo && setEstado({ imoveis: [], carregando: false, erro: true }));
    return () => {
      ativo = false;
    };
  }, []);

  return estado;
}
