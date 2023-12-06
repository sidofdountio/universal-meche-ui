FROM node:18.17.1 AS build
WORKDIR /app
COPY package*.json ./
# RUN npm install -g @angular/cli
RUN npm install --force
COPY . .
RUN npm run build
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/boutique-meche/ /usr/share/nginx/html
EXPOSE 80

 
