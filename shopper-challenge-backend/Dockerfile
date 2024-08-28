FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN mkdir -p /usr/src/app/uploads && chmod -R 777 /usr/src/app/uploads

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]