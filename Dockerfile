# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image as the base image for the production container
FROM nginx:stable-alpine

# Copy the built React application from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to be able to access the application
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]