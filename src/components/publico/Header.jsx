import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/LogoImobiliaria.png";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080707]/95 text-white backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-4" onClick={fecharMenu}>
          <img src={logo} alt="Kátia & Renata" className="h-14 w-20 shrink-0 object-contain sm:h-21 sm:w-30" />
          <div className="min-w-0">
            <span className="block whitespace-nowrap font-serif text-xs font-semibold tracking-wide sm:text-xl">
              KÁTIA &amp; RENATA
            </span>
            <p className="mt-0.5 whitespace-nowrap font-sans text-[7px] font-normal uppercase tracking-wide text-[#D99A72] sm:text-[10px]">
              Corretoras de Imóveis
            </p>
          </div>
        </Link>

        <nav
          id="menu-principal"
          className={`${menuAberto ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-5 border-b border-white/10 bg-[#080707] px-5 py-5 text-sm text-white/75 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          <a href="#hero" className="hover:text-white" onClick={fecharMenu}>Início</a>
          <Link to="/imoveis" className="hover:text-white" onClick={fecharMenu}>Imóveis</Link>
          <a href="#servicos" className="hover:text-white" onClick={fecharMenu}>Serviços</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://wa.me/5585987823726"
            aria-label="Falar no WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded bg-[#b20f3c] text-white hover:bg-[#c31849] lg:h-auto lg:w-auto lg:px-5 lg:py-3 lg:font-semibold"
          >
            {/* aqui embaixo no path é o caminho svg para o icone do whatsapp quando o usuario abrir o site pelo celular */}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 lg:hidden" fill="currentColor">
              <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a12 12 0 0 0 5.8 1.5h.1c6.6 0 12-5.4 12-12a11.8 11.8 0 0 0-3.7-8.4ZM12.1 21.8h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 0 1-1.5-5.2A10 10 0 0 1 12.1 2a9.9 9.9 0 0 1 7.1 2.9 9.9 9.9 0 0 1 2.9 7.1 10 10 0 0 1-10 9.8Zm5.5-7.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
            </svg>
            <span className="hidden text-sm lg:inline">Falar no WhatsApp</span>
          </a>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white lg:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}