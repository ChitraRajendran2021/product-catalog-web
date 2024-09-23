FROM node:18 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# Add this line to avoid the OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
