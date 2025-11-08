#!/bin/bash
# Test script for local Docker build and run

echo "Building Docker image..."
docker build -t portfolio-website .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "Starting container on port 8080..."
    docker run -d -p 8080:8080 --name portfolio-test portfolio-website
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo ""
        echo "Portfolio is running at: http://localhost:8080"
        echo ""
        echo "To stop the container, run:"
        echo "  docker stop portfolio-test"
        echo "  docker rm portfolio-test"
        echo ""
        echo "To view logs, run:"
        echo "  docker logs portfolio-test"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

