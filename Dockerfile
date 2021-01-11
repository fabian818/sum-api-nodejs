FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Workaround bcrypt issue
RUN npm uninstall bcrypt
RUN npm install bcrypt 
RUN npm rebuild bcrypt --build-from-source

COPY . .
EXPOSE 8080 
CMD [ "node", "server.js" ]
