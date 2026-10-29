const ESTILO_BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-admin border transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const ESTILO_VARIANTE = {
  primaria: "border-admin-primaria bg-admin-primaria text-white enabled:hover:bg-admin-primaria-hover",
  secundaria: "border-admin-borda bg-transparent text-admin-texto enabled:hover:border-admin-borda-foco",
};

const ESTILO_TAMANHO = {
  normal: "h-10 px-5 text-[13px] font-bold",
  pequeno: "h-[30px] px-3.5 text-xs font-medium",
};

// variante: "primaria" (vermelho cheio) ou "secundaria" (contorno, ex.: "Sair")
// tamanho: "normal" ou "pequeno"
export default function Botao({ variante = "primaria", tamanho = "normal", larguraTotal, className = "", ...propsDoBotao }) {
  const classes = [
    ESTILO_BASE,
    ESTILO_VARIANTE[variante],
    ESTILO_TAMANHO[tamanho],
    larguraTotal && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type="button" className={classes} {...propsDoBotao} />;
}
