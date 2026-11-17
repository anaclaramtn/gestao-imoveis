import { Link } from "react-router-dom";

import logo from "../../assets/LogoImobiliaria.png";

const ANO_ATUAL = new Date().getFullYear();
const WHATSAPP = "https://wa.me/5585987823726";

// Rodapé do site: fica sempre escuro, como o cabeçalho.
export default function Rodape() {
  return (
    <footer data-tema="escuro" className="border-t border-white/10 bg-[#080707] px-[clamp(1.25rem,5vw,2.5rem)] py-12 text-white">
      <div className="mx-auto grid w-full max-w-[81rem] grid-cols-[1.4fr_1fr_1fr] gap-10 max-[767px]:grid-cols-1 max-[767px]:gap-8">
        <div>
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="h-16 w-24 object-contain" />
            <div>
              <p className="m-0 font-serif text-xl font-semibold tracking-wide">KÁTIA &amp; RENATA</p>
              <p className="m-0 mt-0.5 text-xs tracking-wide text-[#d99a72] uppercase">Corretoras de Imóveis</p>
            </div>
          </div>
          <p className="mt-5 mb-0 max-w-sm text-sm leading-relaxed text-white/60">
            Atendimento próximo, leitura de mercado e suporte jurídico para decisões imobiliárias seguras.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="m-0 mb-4 text-xs font-bold tracking-[0.06em] text-[#d99a72] uppercase">Navegação</p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-sm text-white/75">
            <li><Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="hover:text-white">Início</Link></li>
            <li><Link to="/imoveis" className="hover:text-white">Imóveis</Link></li>
          </ul>
        </nav>

        <div>
          <p className="m-0 mb-4 text-xs font-bold tracking-[0.06em] text-[#d99a72] uppercase">Contato</p>
          <a
            href={WHATSAPP}
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#b20f3c] px-6 text-sm font-semibold text-white hover:bg-[#c31849]"
          >
            Falar no WhatsApp
          </a>
          <p className="mt-4 mb-0 text-xs leading-relaxed text-white/50">
            CRECI 8988 (Kátia) · CRECI 11.307 (Renata)
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 mb-0 w-full max-w-[81rem] border-t border-white/10 pt-6 text-xs text-white/40">
        © {ANO_ATUAL} Kátia &amp; Renata. Todos os direitos reservados.
      </p>
    </footer>
  );
}
