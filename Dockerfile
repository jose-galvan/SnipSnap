# builder
FROM node:22-alpine3.21 AS build-stage

RUN apk add --no-cache --virtual make gcc g++ build-base python3 git

WORKDIR /

COPY package*.json ./
RUN npm ci

COPY . .
RUN sh ./scripts/set-env.sh

# Build client with environment variables
WORKDIR /packages/client
RUN npm install --package-lock-only && npm ci
RUN npm run build

# Build server
WORKDIR /packages/server 
RUN npm install --package-lock-only && npm ci
RUN npm run build

# production 
WORKDIR /
FROM nginx:stable-alpine AS production-stage
RUN apk add --update --no-cache nodejs

# files from client
COPY --from=build-stage /packages/client/dist /usr/share/nginx/html/app
COPY --from=build-stage /nginx /etc/nginx/conf.d/

# files from server
COPY --from=build-stage /packages/server/dist /server/dist
COPY --from=build-stage /packages/server/config /server/config
COPY --from=build-stage /packages/server/node_modules /server/node_modules
COPY --from=build-stage /scripts/bootstrap.sh /server

WORKDIR /server

EXPOSE 80

CMD ["sh", "bootstrap.sh"]
