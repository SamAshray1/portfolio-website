FROM node:18-alpine AS build

# Use ARG for build-time variables
ARG USERNAME
ARG PASSWORD

# Set them as environment variables inside the image
ENV USERNAME=${USERNAME}
ENV PASSWORD=${PASSWORD}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# FROM node:16

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
