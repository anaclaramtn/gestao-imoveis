import { useEffect, useId, useRef, useState } from "react";

import Rotulo from "./Rotulo";

const ALTURA = {
  normal: "h-10",
  pequeno: "h-[30px]",
};

const TAMANHO_TEXTO = {
  normal: "text-[13px]",
  pequeno: "text-xs",
};

const ESTILO_DIRECAO = {
  baixo: "top-full mt-1",
  cima: "bottom-full mb-1",
};

/*
  Dropdown personalizado com o visual do admin.
    opcoes:   [{ valor: "todos", texto: "Todos os status" }, ...]
    value:    valor da opção escolhida
    onChange: recebe o novo valor (ex.: onChange={setStatus})
    tamanho:  "normal" ou "pequeno"
    direcao:  "baixo" ou "cima" (para onde a lista abre)
    rotulo, obrigatorio, erro: iguais aos do CampoTexto
    placeholder: texto exibido enquanto nada foi escolhido

  Funciona com mouse e teclado: setas, Enter/Espaço para escolher, Esc para fechar.
*/
export default function Seletor({
  opcoes, value, onChange, tamanho = "normal", direcao = "baixo",
  rotulo, obrigatorio, erro, placeholder = "Selecione", className = "", ...outrasProps
}) {
  const [aberto, setAberto] = useState(false);
  const [destacado, setDestacado] = useState(0);
  const raiz = useRef(null);
  const idLista = useId();
  const idRotulo = useId();

  const indiceSelecionado = opcoes.findIndex((opcao) => opcao.valor === value);
  const selecionada = opcoes[indiceSelecionado];

  // Fecha ao clicar fora do dropdown
  useEffect(() => {
    if (!aberto) return;

    function cliqueFora(evento) {
      if (!raiz.current.contains(evento.target)) setAberto(false);
    }

    document.addEventListener("mousedown", cliqueFora);
    return () => document.removeEventListener("mousedown", cliqueFora);
  }, [aberto]);

  // Em listas longas (ex.: estados), rola até a opção destacada pelo teclado
  useEffect(() => {
    if (aberto) document.getElementById(`${idLista}-${destacado}`)?.scrollIntoView({ block: "nearest" });
  }, [aberto, destacado, idLista]);

  function abrir() {
    setDestacado(Math.max(0, indiceSelecionado));
    setAberto(true);
  }

  function escolher(opcao) {
    onChange(opcao.valor);
    setAberto(false);
  }

  function aoApertarTecla(evento) {
    if (!aberto) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(evento.key)) {
        evento.preventDefault();
        abrir();
      }
      return;
    }

    switch (evento.key) {
      case "ArrowDown":
        evento.preventDefault();
        setDestacado((i) => Math.min(i + 1, opcoes.length - 1));
        break;
      case "ArrowUp":
        evento.preventDefault();
        setDestacado((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        evento.preventDefault();
        setDestacado(0);
        break;
      case "End":
        evento.preventDefault();
        setDestacado(opcoes.length - 1);
        break;
      case "Enter":
      case " ":
        evento.preventDefault();
        escolher(opcoes[destacado]);
        break;
      case "Escape":
        evento.preventDefault();
        setAberto(false);
        break;
      case "Tab":
        setAberto(false);
        break;
    }
  }

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      {rotulo && (
        <Rotulo id={idRotulo} obrigatorio={obrigatorio}>
          {rotulo}
        </Rotulo>
      )}

      <div ref={raiz} className="relative flex">
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={aberto}
          aria-controls={idLista}
          aria-activedescendant={aberto ? `${idLista}-${destacado}` : undefined}
          aria-labelledby={rotulo ? idRotulo : undefined}
          aria-invalid={erro || undefined}
          className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-admin border bg-admin-campo pr-3 pl-3 text-left whitespace-nowrap outline-none ${
            aberto ? "border-admin-borda-foco" : erro ? "border-admin-erro" : "border-admin-borda focus-visible:border-admin-borda-foco"
          } ${selecionada ? "text-admin-texto" : "text-admin-texto-suave"} ${ALTURA[tamanho]} ${TAMANHO_TEXTO[tamanho]}`}
          onClick={() => (aberto ? setAberto(false) : abrir())}
          onKeyDown={aoApertarTecla}
          {...outrasProps}
        >
          <span>{selecionada ? selecionada.texto : placeholder}</span>
          <svg
            className={`shrink-0 text-admin-texto-suave transition-transform ${aberto ? "rotate-180" : ""}`}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
  
        {aberto && (
          <ul
            id={idLista}
            role="listbox"
            className={`absolute left-0 z-20 max-h-60 min-w-full overflow-auto rounded-admin border border-admin-borda bg-admin-superficie py-1 shadow-[0_12px_32px_rgb(0_0_0/60%)] ${ESTILO_DIRECAO[direcao]}`}
          >
            {opcoes.map((opcao, indice) => {
              const ehSelecionada = indice === indiceSelecionado;
  
              return (
                <li
                  key={opcao.valor}
                  id={`${idLista}-${indice}`}
                  role="option"
                  aria-selected={ehSelecionada}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2 whitespace-nowrap ${TAMANHO_TEXTO[tamanho]} ${
                    indice === destacado ? "bg-white/5" : "bg-transparent"
                  } ${ehSelecionada ? "font-semibold text-admin-destaque" : "text-admin-texto"}`}
                  onMouseEnter={() => setDestacado(indice)}
                  onMouseDown={(evento) => evento.preventDefault()}
                  onClick={() => escolher(opcao)}
                >
                  {opcao.texto}
                  {ehSelecionada && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
