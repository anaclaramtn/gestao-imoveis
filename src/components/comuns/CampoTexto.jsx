import { useId } from "react";

import Rotulo from "./Rotulo";

/*
  O preenchimento automático do navegador força um fundo claro que não pode
  ser trocado com "background". A sombra interna cobre esse fundo com a cor do
  campo, e o text-fill-color mantém o texto claro.
*/
const ESTILO_AUTOPREENCHIMENTO =
  "autofill:shadow-[inset_0_0_0_1000px_var(--color-admin-campo)] autofill:[-webkit-text-fill-color:var(--color-admin-texto)] autofill:[caret-color:var(--color-admin-texto)] autofill:[transition:background-color_9999s_ease-out_0s]";

const ESTILO_ENTRADA =
  "min-w-0 flex-1 rounded-[5px] border-none bg-transparent px-3 text-sm text-admin-texto outline-none placeholder:text-admin-texto-suave";

/*
  Campo com rótulo opcional.
    icone:      aparece à esquerda dentro do campo (ex.: lupa, "R$")
    acessorio:  aparece à direita (ex.: o botão de mostrar senha)
    erro:       deixa a borda vermelha (campo obrigatório não preenchido)
    multilinha: vira uma caixa de texto grande (textarea)
*/
export default function CampoTexto({ rotulo, obrigatorio, icone, acessorio, erro, multilinha, className = "", ...propsDoInput }) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {rotulo && (
        <Rotulo htmlFor={id} obrigatorio={obrigatorio}>
          {rotulo}
        </Rotulo>
      )}

      <div
        className={`flex items-center rounded-admin border bg-admin-campo transition-colors ${
          erro ? "border-admin-erro" : "border-admin-borda focus-within:border-admin-borda-foco"
        }`}
      >
        {icone && <span className="flex pl-3 text-admin-texto-suave">{icone}</span>}

        {multilinha ? (
          <textarea id={id} aria-invalid={erro || undefined} className={`${ESTILO_ENTRADA} min-h-[110px] resize-y py-2.5 leading-normal`} {...propsDoInput} />
        ) : (
          <input id={id} aria-invalid={erro || undefined} className={`${ESTILO_ENTRADA} h-10 max-[480px]:h-11 ${ESTILO_AUTOPREENCHIMENTO}`} {...propsDoInput} />
        )}

        {acessorio}
      </div>
    </div>
  );
}
