# Use official Node.js version 20 image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies 
# RUN npm install

# Install Nest CLI globally (optional, usually for development, not production)
RUN npm install -g @nestjs/cli

# Copy the rest of the project files
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the port the app listens on
EXPOSE 5000

# Start the application
CMD ["node", "dist/main.js"]
