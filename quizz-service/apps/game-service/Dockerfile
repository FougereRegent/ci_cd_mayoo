FROM node:20.10.0 AS BUILD

WORKDIR /build

COPY ./apps/game-service/tsconfig.app.json .
COPY ./apps/game-service/src/ src/ 
COPY ./libs/ libs/
COPY tsconfig.json .
COPY package.json .
COPY tsconfig.build.json .
COPY yarn.lock .

RUN yarn install \
&& yarn run build

FROM node:20.10.0 AS PROD
WORKDIR /app

ENV NODE_ENV=""
ENV PORT=3000
ENV REDIS_ADDR=""
ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY --from=BUILD /build/dist/ ./.
COPY --from=BUILD /build/node_modules/ ./node_modules
COPY ./apps/game-service/.env .

RUN mkdir -p /var/log/app
