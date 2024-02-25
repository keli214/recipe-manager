FROM node:20.11.1-alpine

WORKDIR /usr/frontend

COPY . .
RUN rm -rf node_modules/ package-lock.json
RUN npm install

RUN npm run build

# Run the application
CMD ["sh","-c", "npm start"]