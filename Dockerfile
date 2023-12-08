FROM node:20.10.0 as build
WORKDIR /app
COPY package*.json ./
# RUN npm install --force @angular/cli
# RUN npm cache clean --force
RUN npm install --force
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/boutique-meche/ /usr/share/nginx/html
EXPOSE 80

 
