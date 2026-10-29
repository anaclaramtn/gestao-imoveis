import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alerta from "../../components/comuns/Alerta";
import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import CampoTexto from "../../components/comuns/CampoTexto";
import Logomarca from "../../components/comuns/Logomarca";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(evento) {
    evento.preventDefault();

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    // Por enquanto não há autenticação: o login leva direto ao painel.
    navigate("/admin/painel");
  }

  return (
    // No celular (até 480px) o cartão some e o formulário ocupa a tela inteira
    <main className="flex min-h-screen items-center justify-center bg-admin-fundo px-4 py-6 leading-[normal] text-admin-texto [color-scheme:dark] max-[480px]:items-start max-[480px]:px-5 max-[480px]:py-0">
      <section className="w-full max-w-[360px] rounded-admin-cartao border border-admin-borda bg-admin-superficie px-9 pt-9 pb-10 shadow-[0_24px_48px_rgb(0_0_0/50%)] max-[480px]:max-w-none max-[480px]:border-none max-[480px]:bg-transparent max-[480px]:px-0 max-[480px]:pt-[20vh] max-[480px]:pb-8 max-[480px]:shadow-none">
        <header className="mb-7 flex flex-col items-center gap-3.5 max-[480px]:mb-10">
          <Logomarca />
          <p className="text-[11px] uppercase tracking-[0.02em] text-admin-destaque">Acesso restrito ao corretor</p>
        </header>

        <form className="flex flex-col gap-4 max-[480px]:gap-5" onSubmit={entrar} noValidate>
          <CampoTexto
            rotulo="E-mail"
            obrigatorio
            type="email"
            autoComplete="username"
            placeholder="seu@email.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CampoSenha
            rotulo="Senha"
            obrigatorio
            autoComplete="current-password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <Alerta>{erro}</Alerta>}

          <Botao type="submit" larguraTotal className="max-[480px]:mt-3 max-[480px]:h-11">
            Entrar no Painel
          </Botao>
        </form>
      </section>
    </main>
  );
}
