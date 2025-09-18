# Etapa de build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa de produção (Nginx)
FROM nginx:alpine

# Remover configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copiar build gerado
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
