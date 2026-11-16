import { useState } from "react";

const CHAVE = "tema";

// O tema fica em <html data-tema="claro|escuro">; o script do index.html define o valor inicial.
const temaAtual = () => (document.documentElement.dataset.tema === "claro" ? "claro" : "escuro");

// Devolve [tema, alternar]. A escolha fica salva neste navegador.
export function useTema() {
  const [tema, setTema] = useState(temaAtual);

  function alternar() {
    const novo = tema === "claro" ? "escuro" : "claro";
    document.documentElement.dataset.tema = novo;
    try {
      localStorage.setItem(CHAVE, novo);
    } catch {
      // sem armazenamento (ex.: janela privada): o tema vale só até recarregar
    }
    setTema(novo);
  }

  return [tema, alternar];
}
