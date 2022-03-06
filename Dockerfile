FROM node:14-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

RUN npm install

ENV NODE_PATH=/usr/app/node_modules

RUN npm run build

EXPOSE 9000



