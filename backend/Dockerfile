FROM node:20.11.1-alpine

WORKDIR /usr/backend

COPY . .

RUN rm -rf node_modules/ package-lock.json

RUN npm install nodemon
RUN npm install

CMD ["sh", "-c", "npm start"]