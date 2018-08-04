FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm i npm@latest -g && npm install -g @angular/cli && npm install
COPY . /app
CMD ng build --prod && node server.js
EXPOSE 3004


