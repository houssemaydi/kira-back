# Use a lightweight Node.js image
FROM node:22.13.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install bash (if needed)
RUN apk add --no-cache bash

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire app
COPY . .

# Ensure environment file exists
RUN if [ ! -f .env ]; then cp env-example-relational .env; fi

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
