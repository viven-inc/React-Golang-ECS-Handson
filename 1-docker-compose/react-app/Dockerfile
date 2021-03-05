FROM node:14.15.4-alpine as builder

WORKDIR /app/front 
COPY package.json /app/front/package.json 
COPY package-lock.json /app/front/package-lock.json 
RUN npm install --silent 
COPY ./public/ /app/front/public/
COPY ./src/ /app/front/src/

RUN npm run build 

## Multi build 
FROM nginx:1.18.0-alpine 

COPY --from=builder /app/front/build /var/www/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 
CMD ["nginx", "-g", "daemon off;"]
