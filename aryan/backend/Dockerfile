# Dockerfile
FROM node:16.15.1-alpine
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY / . 
EXPOSE $PORT
ENV NUXT_PORT=$PORT
ENV PROXY_API=$PROXY_API
ENV PROXY_LOGIN=$PROXY_LOGIN
CMD ["npm", "run", "dev"]