# Gestão de Imóveis

Aplicação web com catálogo público de imóveis e painel de administração para gerenciá-los.

**Tecnologias:** React, Vite, Tailwind CSS e Firebase (Authentication e Cloud Firestore).

## Como executar

É necessário ter o Node.js (20.19+ ou 22.12+) e um projeto no Firebase com Cloud Firestore e login por e-mail/senha.

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env` e preencha com as credenciais do Firebase.
3. Crie o usuário administrador em **Authentication > Users** e publique as regras do `firestore.rules`.
4. Rode `npm run dev`.

O painel de administração fica em `/admin`.
