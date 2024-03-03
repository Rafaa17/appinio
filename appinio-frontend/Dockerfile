# base image
FROM node:18-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install

RUN npm install react-scripts -g --silent

COPY . ./
RUN npx react-scripts build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
