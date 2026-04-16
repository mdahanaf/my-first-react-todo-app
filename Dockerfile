# # Create a docker file for this react todo application using node 18 alpine
# # Use the official Node.js 18 image as the base image
# FROM node:22-alpine
# # Set the working directory in the container
# WORKDIR /app
# # Copy the package.json and package-lock.json files to the working directory
# COPY package*.json ./
# # Install the dependencies
# RUN npm install
# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the React application
# RUN npm run build
# # Expose the port that the application will run on
# EXPOSE 1981
# # Start the application using the production build
# CMD ["npm", "run", "dev-docker"]
# Stage 1: Build stage
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production stage (The "Lean" Machine)
FROM nginx:stable-alpine
# Copy the built files from the first stage to Nginx's public folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

