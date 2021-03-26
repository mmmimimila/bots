FROM node:13.7.0
#-alpine3.10

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY ./build /app
COPY ./public /public

EXPOSE 80
CMD npm run server
