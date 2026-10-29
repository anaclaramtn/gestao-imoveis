import "./Credenciais.css";

const credenciais = [
  { valor: "CRECI 06849-F", descricao: "Kátia" },
  { valor: "CRECI 89187-F", descricao: "Renata" },
  { valor: "15 anos", descricao: "de mercado" },
  { valor: "Atendimento completo", descricao: "do imóvel à documentação" },
];

export default function Credenciais() {
  return (
    <section className="credenciais" aria-label="Credenciais e experiência">
      <ul className="credenciais__lista">
        {credenciais.map(({ valor, descricao }) => (
          <li className="credenciais__item" key={valor}>
            <p className="credenciais__valor">{valor}</p>
            <p className="credenciais__descricao">{descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
