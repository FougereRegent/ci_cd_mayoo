FROM node:20.10.0 AS BUILD

WORKDIR /build

COPY ./apps/quizz-service/tsconfig.app.json .
COPY ./apps/quizz-service/src/ src/ 
COPY ./libs/ libs/
COPY tsconfig.json .
COPY package.json .
COPY tsconfig.build.json .
COPY yarn.lock .
COPY prisma/ prisma/

RUN yarn install \
&& yarn prisma generate \
&& yarn run build \
&& sed "s/<rootDir>\/apps\//<rootDir>/g" -i ./package.json \
&& sed "s/<rootDir>\/libs\//<rootDir>/g" -i ./package.json \
&& yarn test


FROM node:20.10.0 AS PROD
WORKDIR /app

ENV NODE_ENV=""
ENV PORT=3000
ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*
RUN yarn add prisma

COPY --from=BUILD /build/dist/ ./.
COPY --from=BUILD /build/node_modules/ ./node_modules
COPY --from=BUILD /build/prisma/ ./prisma
COPY ./apps/quizz-service/.env .

RUN mkdir -p /var/log/app

CMD ["dockerize", "-wait", "tcp://${DB_ADDR}:${DB_PORT}"]
