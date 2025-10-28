# 🚀 Quick Start Guide

Welcome to CipherStudio! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher) installed
- Docker and Docker Compose installed (optional, for Docker setup)
- MongoDB installed locally OR use MongoDB Atlas (cloud)

## Quick Setup Options

### Option A: Docker (Easiest) ⭐

```bash
# 1. Start everything with Docker
docker-compose up --build

# 2. Access the application:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - MongoDB: mongodb://localhost:27017
```

That's it! The Docker setup handles everything automatically.

### Option B: Manual Setup

#### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d" > .env

# Start backend server
npm start
```

#### Step 2: Frontend Setup

```bash
# Open a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend server
npm start
```

#### Step 3: Setup MongoDB

You have two options:

**Option 3a: Local MongoDB**
```bash
# If MongoDB is installed locally, it should start automatically
# Or start it manually:
mongod
```

**Option 3b: MongoDB Atlas (Cloud)**
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create a free account
# 3. Create a new cluster
# 4. Get your connection string
# 5. Update MONGODB_URI in backend/.env
```

## Installation Requirements

For manual setup (Option B), you need to install language compilers:

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install -y gcc g++ python3 python3-pip openjdk-17-jdk nodejs
```

### macOS
```bash
# Install Homebrew first, then:
brew install gcc python3 openjdk@17
```

### Windows
```bash
# Install Chocolatey first, then:
choco install mingw python3 openjdk17
```

## First Steps

1. **Start the application** (using Option A or B above)

2. **Open your browser** and navigate to http://localhost:3000

3. **Create an account** by clicking "Sign Up" in the navigation

4. **Start coding!** Click on "Editor" to begin writing and executing code

## Testing the Application

### Test Code Execution

Try this Python code:
```python
print("Hello, CipherStudio!")
```

Or this C++ code:
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify your `.env` file exists in `backend/` directory
- Check if port 5000 is already in use

### Frontend won't start
- Check if port 3000 is already in use
- Verify Node.js version: `node --version` (should be v18+)
- Clear npm cache: `npm cache clean --force`

### Code won't execute
- Make sure compilers are installed (gcc, python3, javac)
- Check backend logs for errors
- Verify language is supported

### MongoDB connection issues
- Verify MongoDB is running: `systemctl status mongod` (Linux)
- Check connection string in `.env` file
- Try using `mongodb://127.0.0.1:27017/cipherstudio` instead of `localhost`

## Project Structure Overview

```
cipherstudioapp/
├── backend/              # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── models/      # MongoDB models (User, CodeSnippet)
│   │   ├── routes/      # API routes (auth, compile, code)
│   │   ├── services/    # Compiler service
│   │   └── config/      # Database configuration
│   └── temp/           # Temporary code files
├── frontend/            # Frontend (React)
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.js       # Main app component
│   └── public/         # Static files
├── docker-compose.yml   # Docker configuration
└── README.md           # Detailed documentation
```

## Environment Variables

Create a `.env` file in the `backend/` directory with these variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d
```

## Next Steps

1. ✅ Install and run the application
2. ✅ Test code execution with different languages
3. ✅ Create a user account
4. ✅ Save and share code snippets
5. 📖 Read the full README.md for detailed documentation
6. 🔧 Customize the application to your needs

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints documentation
- Check backend logs for error messages
- Ensure all dependencies are properly installed

## Features to Explore

- ✨ Multi-language code editor
- 💾 Save code snippets to MongoDB
- 📊 View execution history
- 👥 User authentication
- 🌐 Public code gallery
- 🔒 Private code snippets

Happy Coding! 🎉

