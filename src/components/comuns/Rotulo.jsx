// Texto dourado em maiúsculas que fica acima dos campos.
// Use "htmlFor" para ligar a um input, ou "id" para campos que usam aria-labelledby.
export default function Rotulo({ children, obrigatorio, ...props }) {
  return (
    <label className="text-[11px] font-bold uppercase tracking-[0.04em] text-admin-destaque" {...props}>
      {children}
      {obrigatorio && <span className="text-admin-borda-foco"> *</span>}
    </label>
  );
}
