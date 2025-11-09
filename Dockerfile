# Multi-stage build for optimized production image

# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Verify build output
RUN echo "=== Build verification ===" && \
    ls -la dist/ && \
    echo "=== Checking index.html ===" && \
    test -f dist/index.html && echo "✅ index.html found" || (echo "❌ index.html missing" && exit 1) && \
    echo "=== Checking assets ===" && \
    (test -d dist/assets && echo "✅ assets directory found" && ls -la dist/assets/ | head -10 || echo "⚠️ No assets directory") && \
    echo "=== Build files ===" && \
    find dist -type f | head -10 && \
    echo "✅ Build verification complete"

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify nginx configuration and files
RUN echo "=== Verifying nginx setup ===" && \
    nginx -t && \
    echo "✅ Nginx config valid" && \
    echo "=== Files in nginx html ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== Verifying index.html ===" && \
    test -f /usr/share/nginx/html/index.html && echo "✅ index.html in place" || (echo "❌ index.html missing!" && exit 1) && \
    echo "✅ All files verified"

# Expose port 8080 (Google Cloud Run default)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

