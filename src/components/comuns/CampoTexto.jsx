import { useId } from "react";

/*
  O preenchimento automático do navegador força um fundo claro que não pode
  ser trocado com "background". A sombra interna cobre esse fundo com a cor do
  campo, e o text-fill-color mantém o texto claro.
*/
const ESTILO_AUTOPREENCHIMENTO =
  "autofill:shadow-[inset_0_0_0_1000px_var(--color-admin-campo)] autofill:[-webkit-text-fill-color:var(--color-admin-texto)] autofill:[caret-color:var(--color-admin-texto)] autofill:[transition:background-color_9999s_ease-out_0s]";

// Campo com rótulo opcional. "icone" aparece à esquerda dentro do campo (ex.: lupa)
// e "acessorio" à direita (ex.: o botão de mostrar senha).
export default function CampoTexto({ rotulo, obrigatorio, icone, acessorio, className = "", ...propsDoInput }) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {rotulo && (
        <label className="text-[11px] font-bold uppercase tracking-[0.04em] text-admin-destaque" htmlFor={id}>
          {rotulo}
          {obrigatorio && <span className="text-admin-borda-foco"> *</span>}
        </label>
      )}

      <div className="flex items-center rounded-admin border border-admin-borda bg-admin-campo transition-colors focus-within:border-admin-borda-foco">
        {icone && <span className="flex pl-3 text-admin-texto-suave">{icone}</span>}
        <input
          id={id}
          className={`h-10 min-w-0 flex-1 rounded-[5px] border-none bg-transparent px-3 text-sm text-admin-texto outline-none placeholder:text-admin-texto-suave max-[480px]:h-11 ${ESTILO_AUTOPREENCHIMENTO}`}
          {...propsDoInput}
        />
        {acessorio}
      </div>
    </div>
  );
}
