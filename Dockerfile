FROM node:20.11.1-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM httpd:2.4
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf && sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/dist/mycv/browser/ /usr/local/apache2/htdocs/
COPY apache.htaccess /usr/local/apache2/htdocs/.htaccess
EXPOSE 80
