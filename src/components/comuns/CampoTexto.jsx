import { useId } from "react";
import "./CampoTexto.css";

// Campo com rótulo opcional. "icone" aparece à esquerda dentro do campo (ex.: lupa)
// e "acessorio" à direita (ex.: o botão de mostrar senha).
export default function CampoTexto({ rotulo, obrigatorio, icone, acessorio, className = "", ...propsDoInput }) {
  const id = useId();

  return (
    <div className={`campo ${className}`}>
      {rotulo && (
        <label className="campo__rotulo" htmlFor={id}>
          {rotulo}
          {obrigatorio && <span className="campo__obrigatorio"> *</span>}
        </label>
      )}

      <div className="campo__caixa">
        {icone && <span className="campo__icone">{icone}</span>}
        <input id={id} className="campo__input" {...propsDoInput} />
        {acessorio}
      </div>
    </div>
  );
}
