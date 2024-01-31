# Dockerfile

FROM node:18.16.0-alpine3.17
WORKDIR /opt/app
COPY . .
RUN npm install
COPY src/ .
EXPOSE 3000
CMD [ "npm", "start"]