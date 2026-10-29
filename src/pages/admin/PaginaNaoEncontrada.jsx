import { useNavigate } from "react-router-dom";

import Botao from "../../components/comuns/Botao";

// Exibida quando o endereço começa com /admin mas não existe (ex.: /admin/qualquercoisa).
export default function PaginaNaoEncontrada() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-admin-fundo px-4 leading-[normal] text-admin-texto [color-scheme:dark]">
      <div className="flex max-w-[420px] flex-col items-center text-center">
        <p className="font-titulo text-[96px] leading-none font-medium text-admin-destaque max-[480px]:text-[72px]">
          404
        </p>
        <h1 className="mt-2 mb-2 font-titulo text-[28px] font-medium">Página não encontrada</h1>
        <p className="mb-7 text-[13px] text-admin-texto-suave">
          O endereço que você tentou acessar não existe ou foi removido.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <Botao onClick={() => navigate("/admin/painel")}>Ir para o painel</Botao>
          <Botao variante="secundaria" onClick={() => navigate(-1)}>
            Voltar
          </Botao>
        </div>
      </div>
    </main>
  );
}
