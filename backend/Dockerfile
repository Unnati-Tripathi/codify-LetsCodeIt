# STAGE 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# STAGE 2: Production (Alpine Linux)
FROM node:18-alpine
WORKDIR /app
# Copy only necessary files from the builder stage
COPY --from=builder /app .
# Use the port assigned by Render or default to 10000
EXPOSE 10000
# IMPORTANT: Your entry file is app.js
CMD ["node", "app.js"]