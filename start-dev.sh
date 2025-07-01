#!/bin/bash
# Employee Portal Development Launcher

echo "🚀 Employee Portal Development Environment"
echo "========================================="

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed. Please install Node.js 18+"; exit 1; }
command -v dotnet >/dev/null 2>&1 || { echo "❌ .NET is not installed. Please install .NET 8.0+"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "⚠️  Docker is not installed. Docker deployment will not be available."; }

echo "✅ Prerequisites check passed"
echo ""

# Function to start a service in background
start_service() {
    local service_name=$1
    local service_path=$2
    local service_command=$3
    local service_port=$4
    
    echo "🔄 Starting $service_name..."
    cd "$service_path"
    
    # Install dependencies if needed
    if [ -f "package.json" ]; then
        if [ ! -d "node_modules" ]; then
            echo "📦 Installing dependencies for $service_name..."
            npm install
        fi
    fi
    
    # Start the service
    eval "$service_command" &
    local pid=$!
    echo "✅ $service_name started (PID: $pid, Port: $service_port)"
    echo "$pid" > "/tmp/employee-portal-$service_name.pid"
    
    cd - > /dev/null
}

# Start all services
echo "Starting all services..."
echo ""

# Start API
start_service "API" "./api" "dotnet run" "5000"
sleep 2

# Start Admin Portal
start_service "Admin-Portal" "./admin-portal" "npm start" "4200"
sleep 2

# Start Mobile App
start_service "Mobile-App" "./mobile-app" "npm start" "3000"
sleep 2

echo ""
echo "🎉 All services started successfully!"
echo ""
echo "📱 Mobile App:    http://localhost:3000"
echo "🖥️  Admin Portal: http://localhost:4200"
echo "🔌 API Server:    http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap 'echo ""; echo "🛑 Stopping all services..."; for service in API Admin-Portal Mobile-App; do pid_file="/tmp/employee-portal-$service.pid"; if [ -f "$pid_file" ]; then kill $(cat "$pid_file") 2>/dev/null; rm "$pid_file"; fi; done; echo "✅ All services stopped"; exit 0' INT

# Keep script running
while true; do
    sleep 1
done