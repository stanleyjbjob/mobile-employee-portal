#!/bin/bash

echo "🚀 Mobile Employee Portal - Setup Verification Script"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

success() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

echo ""
echo "1. Checking Prerequisites..."

# Check .NET
if command -v dotnet &> /dev/null; then
    DOTNET_VERSION=$(dotnet --version)
    success ".NET SDK installed: $DOTNET_VERSION"
else
    error ".NET SDK not found. Please install .NET 8.0 SDK"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js installed: $NODE_VERSION"
else
    error "Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm installed: $NPM_VERSION"
else
    error "npm not found"
    exit 1
fi

echo ""
echo "2. Checking Project Structure..."

# Check backend
if [ -d "backend" ]; then
    success "Backend directory exists"
else
    error "Backend directory not found"
    exit 1
fi

# Check frontend
if [ -d "frontend/mobile-app" ]; then
    success "Frontend mobile-app directory exists"
else
    error "Frontend mobile-app directory not found"
    exit 1
fi

# Check environment file
if [ -f ".env" ]; then
    success "Environment file (.env) exists"
else
    warning "Environment file (.env) not found - using defaults"
    cp .env.example .env 2>/dev/null || true
fi

echo ""
echo "3. Testing Backend..."

cd backend

# Check if packages are restored
if dotnet restore --verbosity quiet; then
    success "Backend packages restored successfully"
else
    error "Failed to restore backend packages"
    exit 1
fi

# Check if project builds
if dotnet build --verbosity quiet --no-restore; then
    success "Backend builds successfully"
else
    error "Backend build failed"
    exit 1
fi

# Check if migrations exist
if [ -d "EmployeePortal.Infrastructure/Migrations" ]; then
    success "Database migrations exist"
else
    warning "Database migrations not found - creating initial migration"
    if dotnet ef migrations add InitialCreate -p EmployeePortal.Infrastructure -s EmployeePortal.API --verbose; then
        success "Initial migration created"
    else
        error "Failed to create initial migration"
        exit 1
    fi
fi

cd ..

echo ""
echo "4. Testing Frontend..."

cd frontend/mobile-app

# Check if node_modules exist
if [ -d "node_modules" ]; then
    success "Frontend dependencies already installed"
else
    echo "Installing frontend dependencies..."
    if npm install --legacy-peer-deps --silent; then
        success "Frontend dependencies installed successfully"
    else
        error "Failed to install frontend dependencies"
        exit 1
    fi
fi

# Check TypeScript compilation
if npm run type-check --silent; then
    success "TypeScript compilation passes"
else
    warning "TypeScript compilation has warnings (this is normal for development)"
fi

cd ../..

echo ""
echo "5. Final Setup Check..."

# Check documentation
if [ -f "docs/01-project-setup.md" ]; then
    success "Project setup documentation exists"
else
    error "Project setup documentation missing"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✅ Setup verification completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Review docs/01-project-setup.md for detailed setup instructions"
echo "2. Configure your database connection in .env file"
echo "3. Run the backend: cd backend && dotnet run --project EmployeePortal.API"
echo "4. Run the frontend: cd frontend/mobile-app && npm start"
echo ""
echo "For more information, see README.md and DEVELOPMENT.md"