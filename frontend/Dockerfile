# Use Node.js LTS as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json for dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other files (React source code) into the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for React app
EXPOSE 3000

# Start the React app in production mode
CMD ["npx", "serve", "-s", "build"]
