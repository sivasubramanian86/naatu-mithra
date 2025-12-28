# --- NaatuMithra Root Dockerfile for Cloud Run ---

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for root and backend
COPY package.json .
COPY src/backend/package*.json ./src/backend/

# Install dependencies
RUN npm install
RUN cd src/backend && npm install

# Copy all source files and knowledge base
COPY . .

# Set Environment defaults
# Note: PORT is provided by Cloud Run, AI_PROVIDER can be overridden
ENV AI_PROVIDER=google

# Start the server
# The root package.json has "start": "node src/backend/server.js"
CMD ["npm", "start"]
