#!/bin/bash

echo "🚀 CipherStudio Setup Script"
echo "=============================="
echo ""

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
else
    echo "❌ Docker is not installed. Please install Docker to use Docker setup."
fi

echo ""
echo "Setting up the project..."
echo ""

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "Backend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file for backend..."
    cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d
EOL
    echo "✅ Backend .env file created"
else
    echo "Backend .env file already exists"
fi

# Create temp directory
mkdir -p temp
echo "✅ Backend setup complete"

# Frontend setup
cd ../frontend
echo ""
echo "📦 Installing frontend dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "Frontend dependencies already installed"
fi
echo "✅ Frontend setup complete"

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: mongod (or use Docker)"
echo "2. Start backend: cd backend && npm start"
echo "3. Start frontend: cd frontend && npm start"
echo ""
echo "Or use Docker: docker-compose up --build"
echo ""
echo "Happy Coding! 🎉"

