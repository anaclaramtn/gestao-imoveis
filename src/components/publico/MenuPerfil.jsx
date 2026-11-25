import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useTema } from "../../hooks/useTema";

const ESTILO_ITEM =
  "flex w-full cursor-pointer items-center justify-between gap-3 rounded px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#d99a72]";

/*
  Ícone de perfil no canto direito do cabeçalho.
  No computador abre ao passar o mouse; no celular e no teclado, ao clicar.
  Mostra quem está acessando, o atalho para a área administrativa e o modo claro/escuro.
*/
export default function MenuPerfil({ onAbrir }) {
  const { usuario } = useAuth();
  const [tema, alternarTema] = useTema();
  const [aberto, setAberto] = useState(false);
  const area = useRef(null);
  const claro = tema === "claro";

  // Fecha ao tocar ou clicar fora do menu
  useEffect(() => {
    if (!aberto) return;
    function aoClicarFora(evento) {
      if (!area.current.contains(evento.target)) setAberto(false);
    }
    document.addEventListener("pointerdown", aoClicarFora);
    return () => document.removeEventListener("pointerdown", aoClicarFora);
  }, [aberto]);

  function abrir() {
    setAberto(true);
    onAbrir?.();
  }

  function aoClicarNoIcone(evento) {
    // Com o mouse o menu já abriu ao passar por cima: o clique não deve fechá-lo
    if (aberto && evento.nativeEvent.pointerType !== "mouse") setAberto(false);
    else abrir();
  }

  return (
    <div
      ref={area}
      className="relative"
      onPointerEnter={(evento) => evento.pointerType === "mouse" && abrir()}
      onPointerLeave={(evento) => evento.pointerType === "mouse" && setAberto(false)}
      onBlur={(evento) => {
        // Fecha quando o foco do teclado sai do menu
        if (evento.relatedTarget && !area.current.contains(evento.relatedTarget)) setAberto(false);
      }}
      onKeyDown={(evento) => evento.key === "Escape" && setAberto(false)}
    >
      <button
        type="button"
        onClick={aoClicarNoIcone}
        aria-label="Menu do perfil"
        aria-expanded={aberto}
        aria-controls="menu-perfil"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#d99a72] hover:text-[#d99a72] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99a72]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      </button>

      {/* O pt-2 cobre o vão entre o ícone e o menu, para ele não fechar no caminho do mouse */}
      <div id="menu-perfil" className={`${aberto ? "block" : "hidden"} absolute top-full right-0 w-60 pt-2`}>
        <div className="rounded-md border border-white/10 bg-[#141011] p-2 shadow-[0_12px_32px_rgb(0_0_0/50%)]">
          <div className="mb-1 border-b border-white/10 px-3 pt-1.5 pb-3">
            <p className="m-0 text-xs text-white/60">Você está como</p>
            <p className="m-0 mt-0.5 text-sm font-semibold text-[#d99a72]">{usuario ? "Corretora" : "Visitante"}</p>
          </div>

          <Link to={usuario ? "/admin/painel" : "/admin"} className={ESTILO_ITEM} onClick={() => setAberto(false)}>
            {usuario ? "Ir para o painel" : "Entrar como corretora"}
            <span aria-hidden="true">→</span>
          </Link>

          <button type="button" className={ESTILO_ITEM} onClick={alternarTema}>
            {claro ? "Modo escuro" : "Modo claro"}
            {claro ? (
              // Lua: no modo claro, o clique leva ao escuro
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            ) : (
              // Sol: no modo escuro, o clique leva ao claro
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
