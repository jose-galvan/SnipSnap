# builder
FROM node:22-alpine3.21 AS build-stage

RUN apk add --no-cache --virtual make gcc g++ build-base python3 git

WORKDIR .

ARG ENV

COPY package*.json ./
RUN npm install --package-lock-only && npm ci

COPY . .
RUN npx npm run build --mode $ENV

# production 
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
COPY --from=build-stage /nginx /etc/nginx/conf.d/