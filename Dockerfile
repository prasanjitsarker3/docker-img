# Use Node.js 20
FROM node:20-alpine

# App directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install ALL dependencies (dev + prod)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Expose NestJS port
EXPOSE 5001

# Start applicationx
CMD ["node", "dist/src/main.js"]
# CMD ["npm", "run", "start:dev"]
