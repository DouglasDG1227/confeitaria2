# Etapa de build
FROM node:18 AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências (forçando ignorar conflitos)
RUN npm install --legacy-peer-deps

# Copiar resto do código
COPY . .

# Gerar build de produção
RUN npm run build

# Etapa de produção (Nginx)
FROM nginx:alpine

# Remover arquivos default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar build gerado para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta
EXPOSE 80

# Rodar nginx
CMD ["nginx", "-g", "daemon off;"]
