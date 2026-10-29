import { useId } from "react";

import Rotulo from "./Rotulo";

/*
  Grupo de botões lado a lado em que só um pode estar escolhido por vez
  (ex.: Venda | Aluguel, Publicado | Rascunho).
    opcoes:   [{ valor, texto }, ...]
    value:    valor escolhido
    onChange: recebe o novo valor
    colunasCelular: quantas colunas usar em telas pequenas (padrão: todas numa linha)
*/
export default function SeletorSegmentado({ opcoes, value, onChange, rotulo, obrigatorio, colunasCelular, className = "" }) {
  const idRotulo = useId();

  // Setas do teclado trocam a opção escolhida, como em um grupo de "radio"
  function aoApertarTecla(evento, indice) {
    const passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[evento.key];
    if (!passo) return;

    evento.preventDefault();
    const proximo = (indice + passo + opcoes.length) % opcoes.length;
    onChange(opcoes[proximo].valor);
    evento.currentTarget.parentElement.children[proximo].focus();
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {rotulo && (
        <Rotulo id={idRotulo} obrigatorio={obrigatorio}>
          {rotulo}
        </Rotulo>
      )}

      <div
        role="radiogroup"
        aria-labelledby={rotulo ? idRotulo : undefined}
        className={`grid auto-cols-fr grid-flow-col gap-1 rounded-admin border border-admin-borda bg-admin-campo p-1 ${
          colunasCelular === 2 ? "max-[480px]:grid-flow-row max-[480px]:grid-cols-2" : ""
        }`}
      >
        {opcoes.map((opcao, indice) => {
          const escolhida = opcao.valor === value;

          return (
            <button
              key={String(opcao.valor)}
              type="button"
              role="radio"
              aria-checked={escolhida}
              tabIndex={escolhida ? 0 : -1}
              className={`h-8 cursor-pointer rounded px-3 text-[13px] whitespace-nowrap transition-colors max-[480px]:h-9 ${
                escolhida
                  ? "bg-admin-primaria font-bold text-white"
                  : "bg-transparent text-admin-texto-suave hover:text-admin-texto"
              }`}
              onClick={() => onChange(opcao.valor)}
              onKeyDown={(evento) => aoApertarTecla(evento, indice)}
            >
              {opcao.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}
