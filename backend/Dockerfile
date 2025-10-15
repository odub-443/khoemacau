# Base image
FROM node:18-alpine AS base

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 9005

# Production stage
FROM base AS production
ENV NODE_ENV=production
CMD ["npm", "start"]

# Development stage
FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Test stage
FROM base AS test
ENV NODE_ENV=test
CMD ["npm", "test"]
