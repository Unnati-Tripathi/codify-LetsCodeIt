# STAGE 1: Build React App
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy build output to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose Nginx default port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]