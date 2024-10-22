FROM node:20.11.1-alpine

# Define o diretório de trabalho como /usr/app.
WORKDIR /usr/app

# Instala o Git.
RUN apk add --no-cache git

# Copia o arquivo package.json para o container.
COPY package.json /usr/app/

# Instala as dependências com yarn.
RUN yarn

# Copia o restante dos arquivos do projeto.
COPY . .

# Expõe a porta 5173.
EXPOSE 5173

# Executa o comando yarn dev para iniciar o servidor de desenvolvimento.
CMD yarn dev
