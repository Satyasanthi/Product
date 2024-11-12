# Use Node.js LTS as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json for dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other files (Express source code) into the container
COPY . .

# Expose port 5000 for API
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]
