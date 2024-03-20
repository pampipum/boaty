FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

ARG PUBLIC_HELLO
ARG DATABASE_URL

COPY . /usr/src/app
RUN apk --no-cache add curl
RUN npm install
RUN npm run build

FROM node:21-alpine3.18
WORKDIR /usr/src/app

RUN apk --no-cache add curl

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json
RUN npm i --only=production

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD ["node", "build/index.js"]

