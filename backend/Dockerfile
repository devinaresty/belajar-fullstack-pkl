# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN apk add --no-cache curl

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]
