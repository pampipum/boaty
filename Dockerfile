FROM node:21-alpine3.18 AS sk-build
WORKDIR /usr/src/app

# Build-time variables
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

# Copying source code
COPY . /usr/src/app
RUN apk --no-cache add curl
RUN npm install
RUN npm run build

# Second stage: Setup runtime environment variables
FROM node:21-alpine3.18
WORKDIR /usr/src/app

# Convert ARGs to ENVs for runtime
ENV DATABASE_URL=${DATABASE_URL} \
    SVELTEKIT_PORT=${SVELTEKIT_PORT} \
    GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
    GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET} \
    FROM_EMAIL=${FROM_EMAIL} \
    RESEND_API_KEY=${RESEND_API_KEY} \
    AXIOM_TOKEN=${AXIOM_TOKEN} \
    AXIOM_ORG_ID=${AXIOM_ORG_ID} \
    AXIOM_DATASET=${AXIOM_DATASET} \
    CLAUDE_API_KEY=${CLAUDE_API_KEY}

RUN apk --no-cache add curl

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json
RUN npm i --only=production

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD ["node", "build/index.js"]


