# AquaPro

Sistema de gestão de atletas de uma equipe de natação, com cadastro, listagem, edição e exclusão de atletas. Projeto desenvolvido para a disciplina de <NOME DA DISCIPLINA>, evoluindo a aplicação original com uma nova interface e execução totalmente via Docker.

## Integrantes da equipe

- Arthur Pereira Salvador
- Luiz Guilherme Felix Mainoth
- Douglas Monfredo Machado

## Tecnologias utilizadas

- **Backend:** Java 21 + Spring Boot (Spring Web, Spring Data JPA)
- **Banco de dados:** PostgreSQL 16
- **Frontend:** HTML5, CSS3 e JavaScript (puro, sem frameworks)
- **Containers:** Docker e Docker Compose
- **Servidor do frontend:** Nginx

## Funcionalidades

- Cadastrar atleta (nome, idade, CPF, matrícula, estilo, mensalidade, melhor tempo)
- Listar todos os atletas cadastrados
- Editar dados de um atleta
- Excluir um atleta
- Mensagens de sucesso e erro na interface
- Layout responsivo (funciona em desktop e celular)

## Como executar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados

### Passo a passo

1. Clone este repositório:
```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd aquapro
```

2. Suba todos os containers (backend, frontend e banco de dados):
```bash
   docker compose up --build
```

3. Acesse a aplicação:
   - **Frontend:** http://localhost:8081
   - **API (backend):** http://localhost:8080/atletas

4. Para parar a aplicação:
```bash
   docker compose down
```

## Comandos Docker utilizados

| Comando | Descrição |
|---|---|
| `docker compose up --build` | Constrói as imagens e inicia os containers do backend, frontend e banco de dados |
| `docker compose down` | Para e remove os containers |
| `docker ps` | Lista os containers em execução |
| `docker compose logs -f backend` | Mostra os logs do backend em tempo real |

## Arquitetura

- O **backend** (Spring Boot) expõe uma API REST na porta `8080`.
- O **banco de dados** (PostgreSQL) roda na porta `5432`.
- O **frontend** (HTML/CSS/JS servido por Nginx) roda na porta `8081` e consome a API do backend.
- Todos os containers se comunicam através da rede Docker `aquapro-network`.
