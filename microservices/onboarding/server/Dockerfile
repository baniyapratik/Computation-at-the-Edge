FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

copy . .

EXPOSE 5001

CMD ["npm", "start"]
