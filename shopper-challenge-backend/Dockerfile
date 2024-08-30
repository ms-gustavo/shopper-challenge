FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN chmod -R 777 /usr/src/app

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]