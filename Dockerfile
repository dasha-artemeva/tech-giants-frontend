FROM node:16.17.1-alpine3.16 as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html