# Dockerfile

# Use official Node.js image as base
FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy SCSS files
COPY ./src/styles ./src/styles

# Compile SCSS to CSS
RUN npm run compile-scss

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Serve the React app with nginx
FROM nginx:alpine

# Copy build files to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]