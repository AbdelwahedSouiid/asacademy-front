#first stage
FROM node:latest AS build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --prod


#second stage

FROM nginx:alpine
COPY --from=build /app/dist/project /usr/share/nginx/html

