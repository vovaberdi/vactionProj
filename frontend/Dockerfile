FROM node:alpine
# ENV NODE_ENV = production
WORKDIR  "/vactionProj/frontend/"
RUN npm install -g npm@9.1.1
RUN npm i -g ts-node
RUN npm i -g nodemon

# RUN npm config set http-proxy http://<my company proxy>:8099
# RUN npm config set https-proxy http://<my company proxy>:8099

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./ 
EXPOSE 3000
ENTRYPOINT npm start