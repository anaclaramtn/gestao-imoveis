import "./Botao.css";

// variante: "primaria" (vermelho cheio) ou "secundaria" (contorno, ex.: "Sair")
// tamanho: "normal" ou "pequeno"
export default function Botao({ variante = "primaria", tamanho = "normal", larguraTotal, className = "", ...propsDoBotao }) {
  const classes = [
    "botao",
    `botao--${variante}`,
    tamanho === "pequeno" && "botao--pequeno",
    larguraTotal && "botao--largura-total",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type="button" className={classes} {...propsDoBotao} />;
}
