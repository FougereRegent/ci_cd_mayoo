FROM node:20.10.0

WORKDIR /app

COPY ./app.json .
COPY ./babel.config.js .
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.json .

RUN yarn install

COPY .env .
COPY ./assets assets
COPY ./src src
COPY ./App.tsx .

ENTRYPOINT ["yarn", "start", "--web"]
