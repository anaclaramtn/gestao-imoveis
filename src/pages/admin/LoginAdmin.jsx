import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alerta from "../../components/comuns/Alerta";
import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import CampoTexto from "../../components/comuns/CampoTexto";
import Logomarca from "../../components/comuns/Logomarca";
import "../../styles/tema-admin.css";
import "./LoginAdmin.css";

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
    <main className="tema-admin login-admin">
      <section className="login-admin__cartao">
        <header className="login-admin__cabecalho">
          <Logomarca />
          <p className="login-admin__subtitulo">Acesso restrito ao corretor</p>
        </header>

        <form className="login-admin__formulario" onSubmit={entrar} noValidate>
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

          <Botao type="submit" larguraTotal className="login-admin__entrar">
            Entrar no Painel
          </Botao>
        </form>
      </section>
    </main>
  );
}
