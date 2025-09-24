# EcoTroca - Sistema de Troca Sustentável

### Equipe 4

**Membros:** João Luis, Ray Martins, Nicolas Duarte, Igor Régis

## Descrição do Projeto

O EcoTroca é uma plataforma web com impacto social, desenvolvida para conectar pessoas que desejam trocar objetos que não utilizam mais. Inspirado no conceito de "feira de trocas" online, o projeto busca criar uma solução intuitiva e segura onde o que é obsoleto para uma pessoa pode ter grande valor para outra. O desenvolvimento da aplicação é dividido em duas fases, focando no frontend com **React** e no backend com **Node.js** e **PostgreSQL**.

## Estrutura do Projeto

O projeto é organizado com base na seguinte estrutura de pastas:

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── prisma/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
└── README.md
```

## Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca principal para a construção da interface do usuário.

- **React Router DOM**: Gerenciamento de rotas e navegação.

- **CSS / Bootstrap**: Estilização e design responsivo.

- **JSON Server**: Simulação da API durante a fase de desenvolvimento do frontend.

- **Axios**: Biblioteca para fazer requisições HTTP e consumir a API do backend.

- **SweetAlert**: Utilizado para criar alertas e mensagens de feedback personalizadas para o usuário.

### Backend

- **Node.js**: Ambiente de execução para o servidor.

- **Express**: Framework para a construção da API RESTful.

- **Prisma ORM**: ORM (Object-Relational Mapper) para modelagem e interação com o banco de dados.

- **PostgreSQL**: Banco de dados relacional para persistência de dados.

- **Bcrypt**: Biblioteca utilizada para a criptografia segura das senhas dos usuários.

- **JWT (JSON Web Tokens)**: Implementação de autenticação segura.

- **CORS**: Middleware para permitir requisições seguras entre o frontend (React) e o backend (Node.js).

### Ferramentas

- **VSCode**: Editor de código.

- **Insomnia / Postman**: Ferramentas para testes de requisições da API.

- **GitHub**: Controle de versão e colaboração.

- **Figma**: Utilizado para criar o protótipo visual e o planejamento do fluxo de navegação do frontend.

## Funcionalidades da Aplicação

### Frontend

- **Página Inicial (`/`)**: Listagem de itens com filtros por categoria, cidade e palavra-chave.

- **Página de Login (`/login`)**: Autenticação de usuário para acesso a rotas privadas.

- **Página de Cadastro de Item (`/cadastro`)**: Formulário para publicar um novo item (requer autenticação).

- **Página de Perfil (`/perfil`)**: Área privada onde o usuário pode gerenciar seus itens e propostas.

- **Página de Detalhes (`/item/:id`)**: Exibe informações detalhadas de um item específico.

### Backend

A API RESTful foi construída para suportar as funcionalidades do frontend com as seguintes entidades:

`Usuário`, `Item`, `Categoria` e `Proposta` (ou `Doação`).

#### **Endpoints Mínimos:**

- `GET /itens`: Lista todos os itens disponíveis.

- `GET /itens/:id`: Detalhes de um item específico.

- `POST /itens`: Cria um novo item (requer token JWT).

- `PUT /itens/:id`: Atualiza um item existente.

- `DELETE /itens/:id`: Remove um item.

- `POST /auth/login`: Autenticação do usuário.

- `POST /auth/register`: Cadastro de novo usuário.

- `GET /perfil/:id`: Retorna os itens cadastrados por um usuário.

- `GET /propostas`: Listar propostas (exclusivo para EcoTroca).

- `POST /propostas`: Criar nova proposta (exclusivo para EcoTroca).

---

### Pré-requisitos

Primeiro, certifique-se de que você tem os seguintes softwares instalados na sua máquina:

- **Node.js**: Essencial para rodar o backend e os scripts do frontend. Você pode baixá-lo do site oficial.

- **Git**: Para clonar o projeto do GitHub.

- **PostgreSQL**: O banco de dados do projeto. Você pode instalar o PostgreSQL diretamente ou usar ferramentas como o Docker.

- **Gerenciador de pacotes**: `npm` (geralmente já vem com o Node.js) ou `yarn`.

- **Editor de código**: Um como o VSCode.

---

Para rodar este projeto na sua máquina local, você precisará configurar tanto o ambiente frontend (React) quanto o backend (Node.js) e o banco de dados (PostgreSQL) separadamente.

### Passo a Passo

#### 1. Clonar o Repositório

Abra o terminal ou prompt de comando e clone o projeto do GitHub:

```

git clone <URL_DO_REPOSITÓRIO_GITHUB>

cd <NOME_DO_REPOSITÓRIO>

```

---

#### 2. Configurar o Backend (Node.js e PostgreSQL)

Navegue até a pasta do backend e instale as dependências:

```

cd backend

npm install

```

**Configurar o Banco de Dados:**

1. Certifique-se de que o seu servidor PostgreSQL está rodando.

2. Crie um novo banco de dados para o projeto.

3. No projeto, provavelmente haverá um arquivo de configuração de variáveis de ambiente (`.env` ou similar). Crie um arquivo `.env` e configure a string de conexão com o banco de dados. Exemplo:

```

DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"

```

**Rodar as Migrações do Prisma:**

O projeto utiliza o Prisma ORM, então você precisa aplicar a `schema` do banco de dados.

```

# Aplica o esquema do banco de dados e gera o cliente Prisma

npx prisma migrate dev --name init

```

**Iniciar o Servidor:**

Com o banco de dados configurado, você pode iniciar o servidor da API:

```

npm run dev

```

O servidor do backend estará rodando, geralmente, em `http://localhost:3001`. Você pode testar os endpoints usando ferramentas como o Insomnia ou Postman.

---

#### 3. Configurar o Frontend (React)

Abra um novo terminal, navegue para a pasta do frontend e instale as dependências:

```

cd ../frontend

npm install

```

**Configurar as Variáveis de Ambiente:**

O frontend precisa saber onde o backend está rodando. Crie um arquivo `.env` na raiz do frontend e aponte para a URL do backend.

```

VITE_API_URL=http://localhost:3001

```

**Iniciar a Aplicação React:**

Com as dependências instaladas, inicie o frontend:

Bash

```

npm run dev

```

A aplicação React estará rodando, provavelmente, em `http://localhost:5173`. Agora você pode acessar a aplicação no seu navegador, e ela fará requisições para a API do backend.
