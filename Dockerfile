# Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Set the working directory for the client
WORKDIR /app/client

# Copy client files
COPY CLIENT/package.json CLIENT/package-lock.json ./
RUN npm install
COPY CLIENT/ .
RUN npm run build

# Set the working directory for the server
WORKDIR /app/server

# Copy server files
COPY SERVER/package.json SERVER/package-lock.json ./
RUN npm install
COPY SERVER/ .

# Expose the ports for both client and server
EXPOSE 3000 5173

# Command to run both client and server
CMD ["sh", "-c", "node dist/index.js & npx serve -s ../client/dist"]
