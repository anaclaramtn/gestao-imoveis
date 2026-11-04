import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/publico/Header";
import katia from "../../assets/katia.png";
import renata from "../../assets/renata.png";
import * as imoveisLocal from "../../services/imoveisLocal";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { ehAluguel, ehPublicado } from "../../utils/imovel";

const fotosDeExemplo = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
];

const EMAIL_CONTATO = "krcorretorasdeimoveis@gmail.com";

function urlDaFoto(foto) {
  return typeof foto === "string" ? foto : foto?.url;
}

function fotosDoImovel(imovel) {
  const cadastradas = (imovel.fotos ?? []).map(urlDaFoto).filter(Boolean);
  return cadastradas.length > 0 ? cadastradas : fotosDeExemplo;
}

function numeroDaFoto(fotos, indice) {
  return (indice + fotos.length) % fotos.length;
}

function Caracteristica({ valor, rotulo, unidade = "" }) {
  return (
    <div className="min-w-0 text-left">
      <dt className="font-serif text-[clamp(1rem,1.45vw,1.3rem)] leading-tight text-[var(--color-texto)]">
        {valor}{unidade && <span className="ml-1 text-sm">{unidade}</span>}
      </dt>
      <dd className="mt-1 mb-0 text-[0.52rem] leading-tight text-[#817674] uppercase">{rotulo}</dd>
    </div>
  );
}

function formatarPreco(imovel) {
  const valor = formatadorDeMoeda.format(imovel.preco);
  return ehAluguel(imovel.id_tipo_negociacao) ? `${valor}/mês` : valor;
}

function CartaoRelacionado({ imovel, indice }) {
  const foto = urlDaFoto(imovel.fotos?.[0]) || fotosDeExemplo[indice % fotosDeExemplo.length];

  return (
    <article className="overflow-hidden rounded-md border border-[#211719] bg-[#100d0e]">
      <Link className="relative block h-[clamp(10rem,17vw,13rem)] overflow-hidden bg-[var(--color-superficie-elevada)]" to={`/imoveis/${imovel.id}`}>
        <img className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" src={foto} alt={`Foto de ${imovel.nome}`} loading="lazy" />
        <span className="absolute top-3 left-3 rounded-full bg-[var(--color-primaria)] px-2.5 py-1 text-[0.54rem] font-bold text-white uppercase">{ehAluguel(imovel.id_tipo_negociacao) ? "Para alugar" : "À venda"}</span>
        {imovel.fotos?.length > 0 && <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2 py-1 text-[0.55rem] text-white">▧ {imovel.fotos.length} fotos</span>}
      </Link>
      <div className="px-3.5 pt-0 pb-3.5">
        <span className="flex gap-1 py-2" aria-hidden="true"><i className="h-0.5 w-3.5 bg-[var(--color-rosa)]"/><i className="h-0.5 w-1.5 bg-[#6b273c]"/><i className="h-0.5 w-1.5 bg-[#6b273c]"/></span>
        <h3 className="m-0 truncate font-serif text-lg font-medium">{imovel.nome}</h3>
        <p className="mt-1 mb-2 truncate text-[0.65rem] text-[#968b88]">{[imovel.endereco?.bairro, imovel.endereco?.estado].filter(Boolean).join(", ")}</p>
        <div className="flex flex-wrap gap-x-3 border-t border-[#211719] py-2 text-[0.58rem] text-[#c4b8b4]">
          <span>{imovel.numero_quartos} quartos</span><span>{imovel.numero_banheiros} banheiros</span><span>{imovel.area_construida} m²</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="m-0 font-serif text-base text-[var(--color-dourado)]">{formatarPreco(imovel)}</p>
          <Link className="inline-flex min-h-8 items-center justify-center rounded border border-[rgb(217_154_114_/_45%)] px-3 text-[0.62rem] text-[var(--color-dourado)] no-underline hover:bg-[rgb(217_154_114_/_9%)]" to={`/imoveis/${imovel.id}`}>Ver detalhes</Link>
        </div>
      </div>
    </article>
  );
}

export default function DetalhesImovel() {
  const { id } = useParams();
  const imovel = imoveisLocal.buscarPorId(id);
  const fotos = imovel ? fotosDoImovel(imovel) : [];
  const [fotoAtiva, setFotoAtiva] = useState(0);

  if (!imovel || !ehPublicado(imovel.id_status)) {
    return (
      <div className="min-h-screen bg-[var(--color-fundo)] text-[var(--color-texto)]">
        <Header />
        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-[var(--color-rosa)] uppercase">Imóvel indisponível</p>
          <h1 className="m-0 font-serif text-4xl font-medium">Não encontramos este imóvel.</h1>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-md border border-[rgb(217_154_114_/_45%)] px-5 text-sm text-[var(--color-dourado)] no-underline hover:bg-[rgb(217_154_114_/_9%)]" to="/imoveis">Voltar aos imóveis</Link>
        </main>
      </div>
    );
  }

  const status = ehAluguel(imovel.id_tipo_negociacao) ? "Para alugar" : "À venda";
  const preco = formatadorDeMoeda.format(imovel.preco);
  const precoFinal = ehAluguel(imovel.id_tipo_negociacao) ? `${preco}/mês` : preco;
  const nomeLocalizacao = [imovel.endereco?.bairro, imovel.endereco?.cidade, imovel.endereco?.estado]
    .filter(Boolean)
    .join(" · ");
  const textoContato = `Olá! Tenho interesse no imóvel ${imovel.nome} (${imovel.id}).`;
  const assuntoEmail = `Interesse no imóvel ${imovel.nome}`;
  const corpoEmail = `${textoContato}\n\nGostaria de receber mais informações e agendar uma visita.`;
  const linkEmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_CONTATO)}&su=${encodeURIComponent(assuntoEmail)}&body=${encodeURIComponent(corpoEmail)}`;
  const publicados = imoveisLocal.listar().filter((item) => ehPublicado(item.id_status) && item.id !== imovel.id);
  const relacionadosPreferidos = ["KR-004", "KR-049", "KR-050"]
    .map((idRelacionado) => publicados.find((item) => item.id === idRelacionado))
    .filter(Boolean);
  const relacionados = [...relacionadosPreferidos, ...publicados.filter((item) => !relacionadosPreferidos.includes(item))].slice(0, 3);

  function enviarInteresse(evento) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const mensagem = String(dados.get("mensagem") ?? "").trim();
    const texto = `${textoContato}${nome ? ` Meu nome é ${nome}.` : ""}${mensagem ? ` ${mensagem}` : ""}`;
    window.open(`https://wa.me/5585987823726?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-[var(--color-fundo)] text-[var(--color-texto)]">
      <Header />
      <main className="pt-20">
        <section className="group relative h-[clamp(22rem,46vw,40rem)] w-full overflow-hidden bg-[var(--color-superficie-elevada)] max-[640px]:h-[58vh] max-[640px]:min-h-[22rem]" aria-label={`Galeria de fotos de ${imovel.nome}`}>
          <img className="absolute inset-0 h-full w-full object-cover" src={fotos[fotoAtiva]} alt={`Foto ${fotoAtiva + 1} de ${imovel.nome}`} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          <Link className="absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#171517]/90 text-lg text-white no-underline transition-colors hover:bg-[var(--color-primaria)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" to="/imoveis" aria-label="Voltar para imóveis">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m12.5 4.5-5.5 5.5 5.5 5.5M7.5 10h10" /></svg>
          </Link>

          {fotos.length > 1 && (
            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171517]/85 text-white transition-colors hover:bg-[var(--color-primaria)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" type="button" onClick={() => setFotoAtiva((atual) => numeroDaFoto(fotos, atual - 1))} aria-label="Foto anterior">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m12.5 4.5-5.5 5.5 5.5 5.5" /></svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171517]/85 text-white transition-colors hover:bg-[var(--color-primaria)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" type="button" onClick={() => setFotoAtiva((atual) => numeroDaFoto(fotos, atual + 1))} aria-label="Próxima foto">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>
              </button>
            </div>
          )}
          <span className="absolute right-4 bottom-5 z-10 rounded-full bg-[#171517]/75 px-2.5 py-1 text-[0.62rem] text-white">{fotoAtiva + 1} / {fotos.length}</span>
        </section>

        <section className="px-[clamp(1.25rem,5vw,2.75rem)] py-8 max-[640px]:py-6" aria-label="Resumo do imóvel">
          <div className="mx-auto flex max-w-[81rem] flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-3 inline-flex rounded-full bg-[var(--color-primaria)] px-3 py-1.5 text-[0.55rem] font-bold tracking-wide text-white uppercase">{status}</span>
              <h1 className="m-0 font-serif text-[clamp(2.2rem,4vw,3.1rem)] leading-none font-medium">{imovel.nome}</h1>
              <p className="mt-3 mb-0 text-[0.68rem] text-[#a59692]">{nomeLocalizacao}</p>
            </div>
            <div className="pb-1 text-right max-[520px]:w-full max-[520px]:text-left">
              <p className="m-0 font-serif text-[clamp(1.45rem,2.5vw,2rem)] text-[var(--color-dourado)]">{precoFinal}</p>
              <p className="mt-1 mb-0 text-[0.52rem] tracking-wide text-[#817674] uppercase">Cód. {imovel.id}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#131112] px-[clamp(1.25rem,5vw,2.75rem)] py-5" aria-label="Características do imóvel">
          <dl className="mx-auto mb-0 grid max-w-[81rem] grid-cols-6 gap-5 max-[700px]:grid-cols-3 max-[420px]:grid-cols-2">
            <Caracteristica valor={imovel.area_construida ?? 0} unidade="m²" rotulo="Área construída" />
            <Caracteristica valor={imovel.terreno ?? 0} unidade="m²" rotulo="Terreno" />
            <Caracteristica valor={imovel.numero_suites ?? 0} rotulo="Suítes" />
            <Caracteristica valor={imovel.numero_banheiros ?? 0} rotulo="Banheiros" />
            <Caracteristica valor={imovel.numero_vagas ?? 0} rotulo="Vagas" />
            <Caracteristica valor={imovel.ano ?? "—"} rotulo="Ano" />
          </dl>
        </section>

        <section className="mx-auto grid max-w-[81rem] grid-cols-[minmax(0,1fr)_minmax(16rem,0.52fr)] gap-[clamp(2.5rem,9vw,8rem)] px-[clamp(1.25rem,5vw,2.75rem)] py-[clamp(2.5rem,6vw,4.5rem)] max-[760px]:grid-cols-1 max-[760px]:gap-8 max-[760px]:py-8" aria-labelledby="sobre-imovel-titulo">
          <div>
            <p className="mb-2 text-[0.52rem] font-bold tracking-[0.08em] text-[var(--color-dourado)] uppercase">Sobre o imóvel</p>
            <h2 className="m-0 max-w-[34rem] font-serif text-[clamp(1.8rem,3.1vw,2.55rem)] leading-[1.05] font-medium [text-wrap:balance]" id="sobre-imovel-titulo">Arquitetura que acolhe. Design que permanece.</h2>
            <p className="mt-3 mb-0 max-w-[39rem] text-[0.7rem] leading-[1.75] text-[#a99b97]">{imovel.sobre_imovel}</p>

            <div className="mt-8">
              <h3 className="mb-3 font-serif text-xl font-medium">Comodidades</h3>
              <ul className="m-0 grid max-w-[35rem] list-none grid-cols-1 gap-1.5 p-0">
                {imovel.comodidades.map((comodidade) => (
                  <li className="flex min-h-7 items-center gap-2 rounded-sm border border-[rgb(90_52_61_/_35%)] px-2.5 py-1 text-[0.65rem] text-[#c6b9b5]" key={comodidade}>
                    <svg className="h-3 w-3 shrink-0 text-[#d3c6c2]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="m6 1.5 4.5 4.5L6 10.5 1.5 6 6 1.5Z" /></svg>
                    {comodidade}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit border border-[rgb(90_52_61_/_35%)] bg-[#100d0e] p-4" aria-label="Agende uma visita">
            <p className="mb-2 text-[0.5rem] font-bold tracking-[0.08em] text-[var(--color-dourado)] uppercase">Agende uma visita</p>
            <h2 className="m-0 font-serif text-xl font-medium">Quero conhecer este imóvel</h2>
            <p className="mt-2 mb-3 text-[0.6rem] leading-relaxed text-[#968b88]">Nossa equipe responde com discrição e agilidade.</p>
            <form className="grid gap-2.5" onSubmit={enviarInteresse}>
              <label className="sr-only" htmlFor="interesse-nome">Nome completo</label>
              <input className="min-h-9 rounded-[2px] border border-[rgb(90_52_61_/_45%)] bg-transparent px-2.5 text-[0.6rem] text-[var(--color-texto)] outline-none placeholder:text-[#837673] focus:border-[var(--color-dourado)]" id="interesse-nome" name="nome" placeholder="Nome completo" required />
              <label className="sr-only" htmlFor="interesse-mensagem">Como podemos ajudar?</label>
              <textarea className="min-h-[3.6rem] resize-y rounded-[2px] border border-[rgb(90_52_61_/_45%)] bg-transparent px-2.5 py-2 text-[0.6rem] text-[var(--color-texto)] outline-none placeholder:text-[#837673] focus:border-[var(--color-dourado)]" id="interesse-mensagem" name="mensagem" placeholder="Como podemos ajudar?" />
              <button className="mt-0.5 min-h-8 w-fit rounded-[2px] bg-[var(--color-primaria)] px-3.5 text-[0.6rem] font-semibold text-white transition-colors hover:bg-[#c21f3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-dourado)]" type="submit">Enviar interesse</button>
            </form>
            <p className="mt-2 mb-0 text-[0.48rem] leading-relaxed text-[#786c69]">Ao enviar, você concorda com nossa política de privacidade.</p>
          </aside>
        </section>

        <section className="bg-[#1a1416] px-[clamp(1.25rem,5vw,2.75rem)] py-10" id="contato" aria-labelledby="contato-corretoras-titulo">
          <div className="mx-auto grid max-w-[81rem] grid-cols-[minmax(14rem,0.8fr)_1.2fr] items-center gap-7 max-[640px]:grid-cols-1 max-[640px]:gap-5">
            <div className="grid h-[clamp(12rem,25vw,18rem)] grid-cols-2 gap-1.5 overflow-hidden max-[640px]:max-w-[24rem]">
              <img className="h-full w-full object-cover object-[center_25%]" src={katia} alt="Kátia, corretora de imóveis" />
              <img className="h-full w-full object-cover object-[center_25%]" src={renata} alt="Renata, corretora de imóveis" />
            </div>
            <div>
              <p className="mb-2 text-[0.52rem] font-bold tracking-[0.08em] text-[var(--color-dourado)] uppercase">Atendimento pessoal</p>
              <h2 className="m-0 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-medium" id="contato-corretoras-titulo">Fale com Kátia &amp; Renata</h2>
              <p className="mt-2 mb-0 max-w-2xl text-[0.68rem] leading-relaxed text-[#b1a3a0]">Conhecimento de mercado e suporte completo para você decidir com tranquilidade.</p>
              <p className="mt-3 mb-4 text-[0.54rem] text-[var(--color-dourado)]">Kátia · CRECI 06849-F <span className="px-1.5">|</span> Renata · CRECI 89187-F</p>
              <div className="flex flex-wrap gap-2">
                <a className="inline-flex min-h-8 items-center rounded bg-[var(--color-primaria)] px-3.5 text-[0.6rem] font-semibold text-white no-underline hover:bg-[#c21f3d]" href={`https://wa.me/5585987823726?text=${encodeURIComponent(textoContato)}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
                <a className="inline-flex min-h-8 items-center rounded border border-[rgb(217_154_114_/_45%)] px-3.5 text-[0.6rem] text-[var(--color-texto)] no-underline hover:bg-white/5" href={linkEmail} target="_blank" rel="noreferrer">Enviar e-mail</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[81rem] px-[clamp(1.25rem,5vw,2.75rem)] py-12 max-[640px]:py-9" aria-labelledby="imoveis-relacionados-titulo">
          <p className="mb-2 text-[0.52rem] font-bold tracking-[0.08em] text-[var(--color-dourado)] uppercase">Continue explorando</p>
          <h2 className="mb-6 max-w-[15rem] font-serif text-[clamp(1.8rem,3vw,2.45rem)] leading-[1.04] font-medium" id="imoveis-relacionados-titulo">Imóveis semelhantes</h2>
          <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
            {relacionados.map((relacionado, indice) => <CartaoRelacionado imovel={relacionado} indice={indice} key={relacionado.id} />)}
          </div>
        </section>

        <footer className="border-t border-[rgb(90_52_61_/_25%)] bg-[#080707] px-[clamp(1.25rem,5vw,2.75rem)] pt-10 pb-5">
          <div className="mx-auto grid max-w-[81rem] grid-cols-[1.6fr_0.9fr_1fr_1.1fr_1fr] gap-x-8 gap-y-8 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[420px]:grid-cols-1">
            <div>
              <h2 className="m-0 font-serif text-xl font-medium tracking-wide">KÁTIA &amp; RENATA</h2>
              <p className="mt-2 mb-3 max-w-[14rem] text-[0.62rem] leading-relaxed text-[#9b8c88]">Atendimento imobiliário próximo, estratégico e juridicamente seguro.</p>
              <p className="m-0 text-[0.52rem] text-[var(--color-dourado)]">CRECI 06849-F <span className="px-1">·</span> CRECI 89187-F</p>
            </div>

            <nav className="grid content-start gap-1.5 text-[0.62rem] text-[#a89995]" aria-label="Navegação do rodapé">
              <h3 className="mb-1 text-[0.54rem] font-bold tracking-wide text-[var(--color-dourado)] uppercase">Navegação</h3>
              <a className="text-inherit no-underline hover:text-white" href="/#hero">Início</a>
              <Link className="text-inherit no-underline hover:text-white" to="/imoveis">Imóveis</Link>
              <a className="text-inherit no-underline hover:text-white" href="/#apresentacao">Quem somos</a>
              <a className="text-inherit no-underline hover:text-white" href="#contato">Contato</a>
            </nav>

            <div className="grid content-start gap-1.5 text-[0.62rem] text-[#a89995]">
              <h3 className="mb-1 text-[0.54rem] font-bold tracking-wide text-[var(--color-dourado)] uppercase">Serviços</h3>
              <a className="text-inherit no-underline hover:text-white" href="/#servicos">Compra</a>
              <a className="text-inherit no-underline hover:text-white" href="/#servicos">Venda</a>
              <a className="text-inherit no-underline hover:text-white" href="/#servicos">Aluguel</a>
              <a className="text-inherit no-underline hover:text-white" href="/#servicos">Regularização</a>
              <a className="text-inherit no-underline hover:text-white" href="/#servicos">Assessoria jurídica</a>
            </div>

            <div className="grid content-start gap-1.5 text-[0.62rem] text-[#a89995]">
              <h3 className="mb-1 text-[0.54rem] font-bold tracking-wide text-[var(--color-dourado)] uppercase">Contato</h3>
              <a className="text-inherit no-underline hover:text-white" href="https://wa.me/5585987823726" target="_blank" rel="noreferrer">WhatsApp: (85) 98782-3726</a>
              <a className="text-inherit no-underline hover:text-white" href={linkEmail} target="_blank" rel="noreferrer">{EMAIL_CONTATO}</a>
              <span>Instagram <span className="px-1">·</span> Facebook</span>
            </div>

            <div className="grid content-start gap-1.5 text-[0.62rem] text-[#a89995]">
              <h3 className="mb-1 text-[0.54rem] font-bold tracking-wide text-[var(--color-dourado)] uppercase">Atendimento</h3>
              <span>Endereço comercial editável</span>
              <span>Seg–Sex, 9h às 18h</span>
              <span>Sábados com agendamento</span>
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-[81rem] flex-wrap items-center justify-between gap-3 border-t border-[rgb(90_52_61_/_20%)] pt-4 text-[0.52rem] text-[#746865]">
            <p className="m-0">© {new Date().getFullYear()} Kátia &amp; Renata — Corretoras de Imóveis</p>
            <p className="m-0">Política de privacidade <span className="px-1">·</span> Termos de uso <span className="px-1">·</span> Cookies</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
