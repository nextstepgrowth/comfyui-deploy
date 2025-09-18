# Use the official Node.js image
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies needed for building native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json ./

# Install dependencies with npm instead of bun
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
