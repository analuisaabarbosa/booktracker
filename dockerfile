FROM node:21 AS build

WORKDIR /booktracker

COPY . .

FROM nginx:alpine

COPY --from=build /booktracker /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod -R 755 /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80