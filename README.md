# Autenticação com Google

Este projeto foi desenvolvido para realizar a autenticação de usuários utilizando o script oficial do Google OAuth2, altamente recomendado pelos desenvolvedores da Google. Ele proporciona uma solução simples e segura para login de novos usuários via Google.

## Funcionalidades

A aplicação oferece as seguintes funcionalidades:

- Autenticação via pop-up do Google.
- Envio do token retornado para uma API.
- Finalização do cadastro de usuários.
- Listagem de usuários cadastrados.
- Filtros de busca por nome e CPF.

## Tecnologias Utilizadas

O projeto foi construído com a versão mais recente do **Vue.js 3**, utilizando a **Options API**. Algumas das principais ferramentas e bibliotecas usadas incluem:

- **Vue Router**: Gerenciamento de rotas.
- **Vuex**: Gerenciamento de estado global.
- **Vite.js**: Ferramenta de build para desenvolvimento rápido.
- **Tailwind CSS**: Estilização rápida e eficiente.
- **Lodash**: Utilitário para manipulação de arrays, objetos e strings de maneira eficiente.
- **Axios**: Cliente HTTP para comunicação com APIs.
- **Docker**: Para criação de ambientes isolados.

## Instalação

1 - Instale o docker e o docker compose no seu SO.

3 - Encerre todos os serviços rodando na sua máquina que usam a porta 5173.

4 - Rode os containers docker
> Juntamente irá instalar o git, instala as dependências do projeto com yarn e inicializa o servidor web local

```sh
docker compose up -d
```
## Observações

- O componente `Login` contém temporariamente as minhas chaves de autenticação do Google, facilitando o uso para testes. Elas serão removidas posteriormente.

## URL da aplicação

- Aplicação: [http://localhost:5173](http://localhost:5173)

