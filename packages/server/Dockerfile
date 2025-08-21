# builder
FROM node:22-alpine3.21 AS build-stage

RUN apk add --no-cache --virtual make gcc g++ build-base python3 git

WORKDIR /

COPY package*.json ./
COPY . .
RUN npm install --package-lock-only && npm ci

RUN npx npm run build

# production 
WORKDIR /
FROM node:22-alpine3.21

# files from api
COPY --from=build-stage ./dist /dist
COPY --from=build-stage ./config /config
COPY --from=build-stage node_modules /node_modules

WORKDIR /

ENTRYPOINT ["node"]

CMD ["dist/main.js"]