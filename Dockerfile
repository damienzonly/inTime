FROM node:alpine as builder

WORKDIR /dist

COPY src src
COPY public public
COPY package.json package.json
COPY .env.production.local .

RUN yarn install > /dev/null
RUN yarn build > /dev/null

FROM nginx:alpine
WORKDIR /
COPY --from=builder /dist/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
