# CipherStudio - Online Code Compiler

A full-stack application for compiling and executing code in multiple programming languages with MongoDB storage.

## Features

- 🌟 Multi-language code editor (C++, Java, Python, C, JavaScript)
- ⚡ Real-time code compilation and execution
- 💾 Save and manage code snippets in MongoDB
- 👥 User authentication and authorization
- 🎨 Modern UI with Monaco Editor
- 🐳 Docker support for easy deployment

## Tech Stack

### Frontend
- React.js
- Monaco Editor for code editing
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express.js
- MongoDB for data storage
- Mongoose for ODM
- JWT for authentication
- Child process execution for code compilation

### Database
- MongoDB (Local or Atlas)

## Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Start all services with Docker Compose
docker-compose up --build

# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# MongoDB: mongodb://localhost:27017
```

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed locally
- GCC, Java, Python compilers installed

#### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
```

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Access the application at http://localhost:3000

## Project Structure

```
cipherstudioapp/
├── backend/
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Compiler service
│   │   └── config/        # Database config
│   ├── temp/             # Temporary code files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Code Compilation
- `POST /api/compile/execute` - Execute code
- `POST /api/compile/compile` - Compile code only

### Code Snippets
- `GET /api/code` - Get all public snippets
- `POST /api/code` - Create new snippet
- `GET /api/code/:id` - Get specific snippet
- `PUT /api/code/:id` - Update snippet
- `DELETE /api/code/:id` - Delete snippet

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

# Optional: Compiler paths
GCC_PATH=/usr/bin/gcc
GPP_PATH=/usr/bin/g++
JAVA_HOME=/usr/lib/jvm/java-17-openjdk
PYTHON_PATH=/usr/bin/python3
```

## Supported Languages

- ✅ Python
- ✅ C++
- ✅ Java
- ✅ C
- ✅ JavaScript

## Features in Detail

### Code Editor
- Syntax highlighting
- Auto-completion
- Multi-language support
- Line numbers
- Theme customization

### Code Execution
- Secure code execution
- Timeout protection (10 seconds)
- Input/output handling
- Error reporting

### MongoDB Storage
- User management
- Code snippet storage
- Execution history
- Public/private snippets

## Development

```bash
# Install all dependencies
npm install

# Run backend in development mode
cd backend && npm run dev

# Run frontend in development mode
cd frontend && npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Credits

Built as a full-stack project using MongoDB for storage.


