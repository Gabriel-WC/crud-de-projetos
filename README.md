# Mini Jira com React + Firebase

Aplicacao web de gerenciamento de projetos e tarefas com autenticacao, dashboard, CRUD completo e board Kanban.

## Requisitos

- Node.js 18+
- npm 9+
- Firebase CLI (`npm install -g firebase-tools`)

## Ambientes

- Desenvolvimento: `.env.development` + projeto Firebase `projetocrud-941a5`
- Producao: `.env.production` + projeto Firebase `projetocrud2-be018`

O Vite usa automaticamente:

- `npm run dev` -> `.env.development`
- `npm run build` -> `.env.production`
- `npm run build:dev` -> build com variaveis de desenvolvimento
- `npm run build:prod` -> build com variaveis de producao

Os aliases do Firebase estao definidos assim:

- `dev` -> `projetocrud-941a5`
- `prod` -> `projetocrud2-be018`

## Como rodar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Preencha os arquivos `.env.development` e `.env.production` na raiz do projeto.

4. Rode o projeto:

```bash
npm run dev
```

## Configuracao do Firebase

1. Crie os projetos Firebase de `dev` e `prod`.
2. Ative `Authentication > Sign-in method > Email/Password` em ambos.
3. Crie um app Web em cada projeto e copie as credenciais para `.env.development` e `.env.production`.
4. Ative o `Cloud Firestore` em modo de producao nos dois projetos.
5. Publique regras e indices:

```bash
firebase login
npm run deploy:firestore:dev
npm run deploy:firestore:prod
```

## Deploy em Nuvem

Este projeto esta preparado para rodar em nuvem usando Firebase Hosting.

### Deploy de desenvolvimento

```bash
npm run deploy:dev
```

Esse comando:

- gera o build com `.env.development`
- publica `hosting`, `firestore.rules` e `firestore.indexes` no projeto `dev`

### Deploy de producao

```bash
npm run deploy:prod
```

Esse comando:

- gera o build com `.env.production`
- publica `hosting`, `firestore.rules` e `firestore.indexes` no projeto `prod`

### Deploy manual por etapa

```bash
npm run build:dev
npm run deploy:hosting:dev
```

```bash
npm run build:prod
npm run deploy:hosting:prod
```

## URLs em nuvem

Depois do deploy, o app fica disponivel no dominio do Firebase Hosting do projeto correspondente.

- `dev`: dominio do projeto `projetocrud-941a5`
- `prod`: dominio do projeto `projetocrud2-be018`

Voce pode ver a URL exata ao final do comando `firebase deploy`.

## Estrutura

```text
src/
  components/
  contexts/
  hooks/
  pages/
  services/
  styles/
  utils/
```

## Observacoes

- Cada usuario acessa apenas os proprios projetos.
- As tarefas sao vinculadas ao usuario autenticado e ao projeto dono dele.
- O board Kanban permite alterar status por seletor e botoes de avancar/voltar.
- Os arquivos de ambiente do Vite devem ficar na raiz do projeto, nao dentro de `src/`.
- Os aliases Firebase estao configurados em `.firebaserc` como `dev` e `prod`.

## Alias temporário

- Set-Alias npm "C:\Program Files\nodejs\node.exe"
  function npm { & "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" $args }