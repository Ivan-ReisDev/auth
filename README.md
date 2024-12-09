# API TESTE TÉCNICO

Esta API, desenvolvida como parte de um teste técnico para a Reverbs, oferece funcionalidades baseadas em autenticação JWT para gerenciar usuários e dados de forma segura. Construída com o framework Nest.js, ela demonstra práticas modernas de desenvolvimento backend, sendo ideal para aplicações que requerem autenticação robusta e organização modular.

## Recursos Disponíveis

- Criar usuário.
- Listar usuários: Obtenha o perfil do usuário de forma rápida.
- Autenticação.

## Tecnologias usadas

**Linguagem:** Typescript

**ORM:** Prisma

**Container:** Docker

**Framework:** Nest.js

**Database:** PostgreSQL

## Instalação e Configuração

**Pré requisitos**

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 20 ou superior)
- Typescript (versão 5.7.2 ou superior)
- PostgreSQL (ou outro banco de dados compatível)
- Docker (versão 27.3.1 ou superior) 
- npm ou yarn

Faça o donwload do repositório através do github usando o comando:

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Após entrar na pasta será necessário configurar variáveis de ambiente, para isso crie na raíz do projeto o arquivo `.env`
será necessário setar as seguintes variáveis:
`DATABASE_URL` url do data base em postgres.
`JWT_SECRET` Segredo para auteticação.
`JWT_EXPIRATION_TIM` tempo de expiração do token (aqui é contado em dias).

Exemplo:
```bash
DATABASE_URL="postgresql://postgres:123456789@localhost:5432/auth-teste"
JWT_SECRET="development"
JWT_EXPIRATION_TIME=1
```

Caso use outra url será necessário adicionar o `connect_timeout=60&pool_timeout=3` ao final da url do database.

## Rodar Localmente

Para iniciar o projeto use:

Instalar dependências

```bash
  npm install
```

Iniciar o container Docker:

```bash
  docker compose up -d
```

Iniciar o servidor

```bash
  npm run start:dev
```

O servidor ficará disponível na url `http://localhost:3000`

## Endpoints

#### POST Users

```http
  POST /users
```

| Campo           | Type     | Obrigatório | Description                  |
| :-------------- | :------- | :---------- | :--------------------------- |
| `name`          | `string` | SIM         | Nome do usuário              |
| `email`         | `string` | SIM         | email único por usuário      |
| `password`      | `string` | SIM         | Senha de acesso              |

Exemplo de corpo:

```json
{
  "name": "Ivan",
  "email": "ivan@teste.com",
  "password": "senha123"
}
```

Exemplo de requisição:

```js
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bookData),
});
```


#### POST Auth

```http
  POST /auth
```

O endipoint é usado para autenticação o usuário deverá enviar `email` e `password` para login.


| Query           | Type     | Obrigatório | Description                  |
| :-------------- | :------- | :---------- | :--------------------------- |
| `email`         | `string` | SIM         | email cadastrado pelo usuário|
| `password`      | `string` | SIM         | Senha do usuário em questão  |



Exemplo de requisição:

```js
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

#### GET Users

```http
  POST /users
```

Endpoit usado para lista usuários, esse endpoit deve entrar com 2 query, sendo elas na seguinte ordem:
`page=1&limit=10` 



| Query           | Type     | Obrigatório | Description                  |
| :-------------- | :------- | :---------- | :--------------------------- |
| `page`          | `string` | SIM         | Número da página em questão  |
| `limit`         | `string` | SIM         | número de usuários por página|


lembrnado que para acessar esse endpoit é necessário uma autenticação por token;

Exemplo de requisição:

```js
const response = await fetch(url, {
  method: "GET",
  headers: {
     "Authorization": `Bearer ${token}`
  },
});
```

