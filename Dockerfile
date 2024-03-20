FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

ARG DATABASE_URL
ARG SVELTEKIT_PORT
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG FROM_EMAIL
ARG RESEND_API_KEY
ARG AXIOM_TOKEN
ARG AXIOM_ORG_ID
ARG AXIOM_DATASET
ARG CLAUDE_API_KEY

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

