// Cartão com título que agrupa uma parte do formulário (ex.: "Localização").
export default function SecaoFormulario({ titulo, children }) {
  return (
    <section className="rounded-admin-cartao border border-admin-borda bg-admin-superficie p-6 max-[480px]:p-4">
      <h2 className="mb-5 font-titulo text-xl font-medium">{titulo}</h2>
      {children}
    </section>
  );
}
