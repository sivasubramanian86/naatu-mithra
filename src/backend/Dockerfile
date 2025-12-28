# --- NaatuMithra Backend Dockerfile ---

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
ENV PORT=3001
ENV AI_PROVIDER=aws

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
