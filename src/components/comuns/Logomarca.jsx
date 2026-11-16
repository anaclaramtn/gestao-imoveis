import logo from "../../assets/LogoImobiliaria.png";

// Logomarca da imobiliária (a mesma do site público), usada no login e no cabeçalho do admin.
export default function Logomarca({ largura = 116, altura = 88 }) {
  return (
    <img
      src={logo}
      alt="Kátia & Renata"
      className="shrink-0 object-contain"
      style={{ width: largura, height: altura }}
    />
  );
}
