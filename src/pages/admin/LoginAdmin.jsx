import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Alerta from "../../components/comuns/Alerta";
import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import CampoTexto from "../../components/comuns/CampoTexto";
import Logomarca from "../../components/comuns/Logomarca";
import { useAuth } from "../../contexts/AuthContext";
import {
  entrar as entrarNoFirebase,
  mensagemDeErroDeLogin,
  mensagemDeErroDeRecuperacao,
  recuperarSenha,
} from "../../services/authService";

// Botões com cara de link ("Esqueci minha senha" e "Voltar ao login")
const ESTILO_LINK =
  "cursor-pointer text-xs font-semibold text-admin-destaque underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-60";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { usuario, carregando } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    setErro("");
    setEntrando(true);
    try {
      await entrarNoFirebase(email, senha);
      navigate("/admin/painel");
    } catch (erroDeLogin) {
      setErro(mensagemDeErroDeLogin(erroDeLogin));
      setEntrando(false);
    }
  }

  // A mesma tela alterna entre entrar e recuperar a senha; o e-mail digitado é mantido
  const [recuperando, setRecuperando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  function trocarModo(paraRecuperacao) {
    setRecuperando(paraRecuperacao);
    setEmailEnviado(false);
    setErro("");
  }

  async function enviarRecuperacao(evento) {
    evento.preventDefault();

    if (!email.trim()) {
      setErro("Preencha o e-mail.");
      return;
    }

    setErro("");
    setEmailEnviado(false);
    setEnviando(true);
    try {
      await recuperarSenha(email);
      setEmailEnviado(true);
    } catch (erroDeEnvio) {
      setErro(mensagemDeErroDeRecuperacao(erroDeEnvio));
    } finally {
      setEnviando(false);
    }
  }

  // Quem já tem sessão salva vai direto ao painel
  if (!carregando && usuario) return <Navigate to="/admin/painel" replace />;

  return (
    // No celular (até 480px) o cartão some e o formulário ocupa a tela inteira
    <main className="flex min-h-screen items-center justify-center bg-admin-fundo px-4 py-6 leading-[normal] text-admin-texto [color-scheme:dark] max-[480px]:items-start max-[480px]:px-5 max-[480px]:py-0">
      <section className="w-full max-w-[360px] rounded-admin-cartao border border-admin-borda bg-admin-superficie px-9 pt-9 pb-10 shadow-[0_24px_48px_rgb(0_0_0/50%)] max-[480px]:max-w-none max-[480px]:border-none max-[480px]:bg-transparent max-[480px]:px-0 max-[480px]:pt-[20vh] max-[480px]:pb-8 max-[480px]:shadow-none">
        <header className="mb-7 flex flex-col items-center gap-3.5 max-[480px]:mb-10">
          <Logomarca />
          <p className="text-xs uppercase tracking-[0.02em] text-admin-destaque">Acesso restrito ao corretor</p>
        </header>

        <form
          className="flex flex-col gap-4 max-[480px]:gap-5"
          onSubmit={recuperando ? enviarRecuperacao : entrar}
          noValidate
        >
          {recuperando && (
            <div className="text-center">
              <h1 className="font-titulo text-2xl font-medium">Recuperar senha</h1>
              <p className="mt-1.5 text-sm text-admin-texto-suave">
                Informe o e-mail de acesso para receber o link de redefinição.
              </p>
            </div>
          )}

          <CampoTexto
            rotulo="E-mail"
            obrigatorio
            type="email"
            autoComplete="username"
            placeholder="seu@email.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!recuperando && (
            <div className="flex flex-col gap-2">
              <CampoSenha
                rotulo="Senha"
                obrigatorio
                autoComplete="current-password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className={`${ESTILO_LINK} self-end`}
                disabled={entrando}
                onClick={() => trocarModo(true)}
              >
                Esqueci minha senha
              </button>
            </div>
          )}

          {erro && <Alerta>{erro}</Alerta>}

          {emailEnviado && (
            <p className="rounded-admin border border-admin-destaque/45 px-3 py-2 text-sm" role="status">
              Se houver uma conta com esse e-mail, você receberá um link para criar uma nova senha. Confira também a caixa
              de spam.
            </p>
          )}

          <Botao
            type="submit"
            larguraTotal
            disabled={entrando || enviando}
            className="max-[480px]:mt-3 max-[480px]:h-11"
          >
            {recuperando
              ? enviando ? "Enviando..." : "Enviar link"
              : entrando ? "Entrando..." : "Entrar no Painel"}
          </Botao>

          {recuperando && (
            <button
              type="button"
              className={`${ESTILO_LINK} self-center`}
              disabled={enviando}
              onClick={() => trocarModo(false)}
            >
              ← Voltar ao login
            </button>
          )}
        </form>

        <div className="mt-6 border-t border-admin-borda pt-5 text-center">
          <Link to="/" className="text-xs text-admin-texto-suave underline-offset-4 hover:text-admin-texto hover:underline">
            Voltar ao site como visitante
          </Link>
        </div>
      </section>
    </main>
  );
}
