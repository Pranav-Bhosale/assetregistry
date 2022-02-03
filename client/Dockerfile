ARG REPO=220052277279.dkr.ecr.us-east-1.amazonaws.com/node:latest
FROM ${REPO}/node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]