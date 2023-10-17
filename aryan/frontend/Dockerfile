# Dockerfile
FROM node:16-alpine
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
EXPOSE $PORT
ENV NUXT_PORT=$PORT
ENV PROXY_API=$PROXY_API
ENV PROXY_LOGIN=$PROXY_LOGIN
CMD ["npm", "start"]
