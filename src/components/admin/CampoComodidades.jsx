import { useId, useState } from "react";

import Rotulo from "../comuns/Rotulo";

/*
  Campo para adicionar comodidades como "tags".
  Digite e aperte Enter (ou o botão +) para adicionar; clique no × da tag para remover.
    value:    array de textos (ex.: ["Piscina", "Churrasqueira"])
    onChange: recebe o novo array
*/
export default function CampoComodidades({ value, onChange, obrigatorio, erro }) {
  const [texto, setTexto] = useState("");
  const id = useId();

  function adicionar() {
    const nova = texto.trim();
    if (!nova) return;

    // Não repete a mesma comodidade (ignorando maiúsculas/minúsculas)
    const jaExiste = value.some((comodidade) => comodidade.toLowerCase() === nova.toLowerCase());
    if (!jaExiste) onChange([...value, nova]);
    setTexto("");
  }

  function remover(comodidade) {
    onChange(value.filter((atual) => atual !== comodidade));
  }

  function aoApertarTecla(evento) {
    // Enter adiciona a tag em vez de enviar o formulário
    if (evento.key === "Enter") {
      evento.preventDefault();
      adicionar();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
        Comodidades
      </Rotulo>

      <div className="flex gap-2">
        <div
          className={`flex flex-1 items-center rounded-admin border bg-admin-campo transition-colors ${
            erro && value.length === 0 ? "border-admin-erro" : "border-admin-borda focus-within:border-admin-borda-foco"
          }`}
        >
          <input
            id={id}
            className="h-10 min-w-0 flex-1 rounded-[5px] border-none bg-transparent px-3 text-sm text-admin-texto outline-none placeholder:text-admin-texto-suave max-[480px]:h-11"
            placeholder="Ex.: Piscina, Churrasqueira, Vista para o mar..."
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            onKeyDown={aoApertarTecla}
          />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-admin border border-admin-primaria bg-admin-primaria text-white transition-colors hover:bg-admin-primaria-hover disabled:cursor-not-allowed disabled:opacity-50 max-[480px]:h-11 max-[480px]:w-11"
          onClick={adicionar}
          disabled={!texto.trim()}
          aria-label="Adicionar comodidade"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {value.length > 0 ? (
        <ul className="mt-1 flex flex-wrap gap-2" aria-label="Comodidades adicionadas">
          {value.map((comodidade) => (
            <li
              key={comodidade}
              className="flex items-center gap-1.5 rounded-full border border-admin-borda bg-admin-campo py-1 pr-1.5 pl-3 text-xs text-admin-texto"
            >
              {comodidade}
              <button
                type="button"
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-admin-texto-suave transition-colors hover:bg-white/10 hover:text-admin-texto"
                onClick={() => remover(comodidade)}
                aria-label={`Remover ${comodidade}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-admin-texto-suave">Nenhuma comodidade adicionada.</p>
      )}
    </div>
  );
}
