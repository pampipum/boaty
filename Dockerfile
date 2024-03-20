# Use node 21.2.0 as base image for the build stage
FROM node:21.2.0 AS sk-build
WORKDIR /usr/src/app

# Set timezone as a build argument
ARG TZ=Europe/Stockholm

# Copy your source code to the image
COPY . /usr/src/app

# Install curl and tzdata using apt-get, set timezone
RUN apt-get update && apt-get install -y curl tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install node modules and build your application
RUN npm install
RUN npm run build

# Use node 21.2.0 as base image for the final stage
FROM node:21.2.0
WORKDIR /usr/src/app

# Install curl and tzdata, set timezone (no need to use apk, corrected to use apt-get)
RUN apt-get update && apt-get install -y curl tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy necessary files from the build stage
COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json
RUN npm i --only=production

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

# Expose port 3000 and set the command to run your app
EXPOSE 3000
CMD ["node", "build/index.js"]
