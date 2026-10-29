const credenciais = [
  { valor: "CRECI 06849-F", descricao: "Kátia" },
  { valor: "CRECI 89187-F", descricao: "Renata" },
  { valor: "15 anos", descricao: "de mercado" },
  { valor: "Atendimento completo", descricao: "do imóvel à documentação" },
];

export default function Credenciais() {
  return (
    <section
      className="border-y border-[rgb(90_52_61_/_27%)] bg-[#0d0b0c] px-[clamp(1.25rem,5vw,4.5rem)] py-7 max-[767px]:px-5 max-[767px]:py-6"
      aria-label="Credenciais e experiência"
    >
      <ul className="mx-auto grid max-w-[81rem] grid-cols-[1fr_1fr_0.8fr_1.2fr] items-center p-0 list-none max-[767px]:grid-cols-2 max-[767px]:gap-y-4">
        {credenciais.map(({ valor, descricao }, index) => (
          <li
            className={`min-w-0 px-[clamp(1rem,4vw,3.5rem)] ${index > 0 ? "border-l border-[rgb(90_52_61_/_33%)]" : ""} max-[767px]:px-4 max-[767px]:[&:nth-child(odd)]:pl-0 max-[767px]:[&:nth-child(n+3)]:border-t max-[767px]:[&:nth-child(n+3)]:border-[rgb(90_52_61_/_33%)] max-[767px]:[&:nth-child(n+3)]:pt-4 md:max-lg:px-5`}
            key={valor}
          >
            <p className="m-0 font-serif text-2xl leading-[1.05] font-semibold text-[var(--color-dourado)] max-[767px]:text-[clamp(1rem,4vw,1.25rem)] md:max-lg:text-xl">
              {valor}
            </p>
            <p className="mt-1 mb-0 text-xs leading-[1.4] text-[#7a6a66]">
              {descricao}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
