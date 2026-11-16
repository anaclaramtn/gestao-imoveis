import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase/config";

export function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha);
}

export function sair() {
  return signOut(auth);
}

// Avisa quando o usuário entra ou sai. Devolve a função para parar de ouvir.
export function observarUsuario(callback) {
  return onAuthStateChanged(auth, callback);
}

// Traduz os códigos de erro do Firebase Auth para mensagens amigáveis
export function mensagemDeErroDeLogin(erro) {
  switch (erro?.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet. Tente de novo.";
    case "auth/user-disabled":
      return "Este usuário está desativado.";
    default:
      return "Não foi possível entrar. Tente novamente.";
  }
}
