import { useState } from "react";
import CampoTexto from "./CampoTexto";
import "./CampoSenha.css";

// Campo de senha com botão de olho para mostrar/ocultar o que foi digitado.
export default function CampoSenha(props) {
  const [visivel, setVisivel] = useState(false);

  const botaoOlho = (
    <button
      type="button"
      className="campo-senha__olho"
      onClick={() => setVisivel(!visivel)}
      aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        {visivel && <line x1="3" y1="3" x2="21" y2="21" />}
      </svg>
    </button>
  );

  return <CampoTexto {...props} type={visivel ? "text" : "password"} acessorio={botaoOlho} />;
}
