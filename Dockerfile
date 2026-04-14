# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Instalação das dependências
COPY package*.json ./
RUN npm install

# Build da aplicação
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para SPA (opcional, mas recomendado)
# Caso queira usar roteamento pelo lado do cliente
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
