# Create a docker file for this react todo application using node 18 alpine
# Use the official Node.js 18 image as the base image
FROM node:22-alpine
# Set the working directory in the container
WORKDIR /app
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build
# Expose the port that the application will run on
EXPOSE 1981
# Start the application using the production build
CMD ["npm", "run", "dev-docker"]

