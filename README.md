<h1 align="center"> Desafio Trindtech </h1>

O desafio consistia em fazer uma plataforma que permitisse a gestão de alunos e cursos, com funcionalidades para criar, visualizar, editar e excluir cursos e alunos, bem como associar alunos a cursos específicos.

---

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Como Executar o Projeto](#como-executar-o-projeto)
7. [Uso](#uso)
8. [Rotas da API](#rotas-da-api)
9. [Contato](#contato)

---

## Descrição do Projeto

O sistema foi desenvolvido para facilitar a administração de cursos e alunos, incluindo funcionalidades como:

- Cadastro de novos alunos e cursos.
- Atualização de informações de alunos e cursos.
- Associação de alunos a cursos.
- Visualização detalhada dos dados.
- Integração com API VIA CEP para facilitar o preenchimento de endereços.

---

## :hammer: Funcionalidades

- **Gerenciamento de Cursos e Alunos**: CRUD completo para cursos e alunos.
- **Associação**: Relacionamento entre alunos e cursos.
- **Integração com API VIA CEP**: Preenchimento automático de endereços.
- **Validação e Feedback**: Validação de campos e mensagens amigáveis para o usuário.

---

## Tecnologias Utilizadas

### Frontend

- **React.js**
- **Bootstrap** e **styled-components** para estilização
- **Axios** para requisições HTTP

### Backend

- **Node.js** com **Express.js**
- **Sequelize** para ORM e interação com PostgreSQL
- **PostgreSQL** como banco de dados
- **dotenv** para variáveis de ambiente

---

## 📁 Estrutura do Projeto

O projeto é dividido em duas pastas principais: `frontend` e `backend`.

/backend/api ├── config ├── controllers ├── models ├── routes ├── app.js ├── package.json
/frontend ├── public ├── src ├── .gitignore ├── eslint.config.js ├── index.html ├── package.json ├── vite.config.js └── README.md

---

## Instalação e Configuração

### Requisitos

- **Node.js**
- **PostgreSQL**

### Passos de Instalação

1. Clone o repositório:

   ```bash
   git clone git@github.com:Alessandra1999/desafio-trindtech.git

   ```

2. Instale as dependências do frontend:

   ```bash
   cd frontend
   npm install

   ```

3. Instale as dependências do backend:

   ```bash
   cd ../backend
   npm install

   ```

4. Configuração do ambiente

- No diretório `backend/api`, crie um arquivo .env no diretório backend com as seguintes variáveis:

  ```env
  DB_USER=(seu usuário do PostgreSQL)
  DB_PASSWORD=(sua senha do PostgreSQL)
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=desafio-trind
  ```

---

## Como Executar o Projeto

1. Rodar o Backend

- Navegue até a pasta `backend/api` e execute:

  ```bash
  npm start

  ```

- O backend estará disponível em http://localhost3000.

2. Rodar o Frontend

- Navegue até a pasta `frontend` e execute:

  ```bash
  npm run dev

  ```

- O frontend estará disponível em http://localhost:5173, padrão do React.

---

## Uso

# No Frontend:

    - **Gestão de Alunos**:
        - Adicione, edite ou remova alunos.
        - Visualize detalhes de cada aluno, incluindo o endereço e cursos associados.
    - **Associação Aluno-Curso:
        - Associe alunos a cursos através do formulário de cadastro.
        - Atualize as associações conforme necessário.

# No Backend:

    - **Gestão de Cursos**:
        - Crie, atualize ou exclua cursos (através de programas como o Postman).
        - Veja a lista completa de cursos.

---

## Rotas da API

# Alunos

- POST /api/students: Adiciona um novo aluno com localização e associação de cursos.
- GET /api/students: Retorna todos os alunos com localização e associação de cursos.
- GET /api/students/{id}: Retorna as informações de um aluno pelo id.
- PUT /api/students/{id}: Atualiza as informações de um aluno.
- DELETE /api/students/{id}: Remove um aluno.

# Cursos

- POST /api/courses: Adiciona um novo curso.
- GET /api/courses: Retorna todos os cursos.
- GET /api/courses/{id}: Retorna as informações de um curso pelo id.
- PUT /api/courses/{id}: Atualiza as informações de um curso.
- DELETE /api/courses/{id}: Remove um curso.

# Associação Aluno-Curso

- POST /api/student-course: Adiciona uma nova associação entre aluno e curso.
- GET /api/student-course: Retorna todas as associações entre aluno e curso.
- GET /api/student-course/{id_student}/{id_course}: Retorna a associação entre o aluno e o curso especificados na url pelo id.
- PUT /api/student-course/{id_student}/{id_course}: Atualiza uma associação entre aluno e curso.
- DELETE /api/student-course/{id_student}/{id_course}: Remove uma associação entre aluno e curso.

--- 

## Contato

## Contato

- **Email**: [![Email](https://skillicons.dev/icons?i=email)](mailto:alessandrarocha.contato@gmail.com)
- **LinkedIn**: [![LinkedIn](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/alessandra-bombardi/)


