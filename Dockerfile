FROM node:latest
RUN apk add curl
WORKDIR /app
COPY next.config.js ./
COPY public ./public
COPY .next ./.next
COPY node_modules ./node_modules
COPY package.json .
EXPOSE 3000
CMD [ "yarn", "start" ]
