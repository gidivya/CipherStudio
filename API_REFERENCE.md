# CipherStudio API Reference

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "codeSnippets": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Code Compilation Endpoints

### Execute Code
```http
POST /compile/execute
Content-Type: application/json

{
  "code": "print('Hello, World!')",
  "language": "python",
  "input": "optional input"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "output": "Hello, World!\n",
  "error": "",
  "executionTime": 123
}
```

**Response (Error):**
```json
{
  "status": "error",
  "output": "",
  "error": "SyntaxError: invalid syntax",
  "executionTime": 50
}
```

### Compile Code (Compile Only)
```http
POST /compile/compile
Content-Type: application/json

{
  "code": "#include <iostream>\nint main() { return 0; }",
  "language": "cpp"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Compilation successful"
}
```

## Code Snippet Endpoints

### Create Code Snippet
```http
POST /code
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Hello World Program",
  "code": "print('Hello, World!')",
  "language": "python",
  "description": "A simple hello world program",
  "isPublic": true,
  "tags": ["hello-world", "python"]
}
```

### Get All Public Snippets
```http
GET /code?page=1&limit=20&language=python&search=hello
```

**Response:**
```json
{
  "snippets": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Hello World Program",
      "code": "print('Hello, World!')",
      "language": "python",
      "description": "A simple hello world program",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "john_doe"
      },
      "isPublic": true,
      "tags": ["hello-world", "python"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

### Get Specific Snippet
```http
GET /code/:id
```

### Update Snippet
```http
PUT /code/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "code": "print('Updated code')"
}
```

### Delete Snippet
```http
DELETE /code/:id
Authorization: Bearer {token}
```

### Get User's Snippets
```http
GET /code/user/:userId
```

## User Endpoints

### Get All Users
```http
GET /users
```

### Get User by ID
```http
GET /users/:id
```

## Supported Languages

- `python` - Python 3
- `cpp` or `c++` - C++
- `java` - Java
- `c` - C
- `javascript` or `js` - JavaScript

## Error Responses

### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Code is required",
      "param": "code",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "error": "Invalid credentials"
}
```

### Not Found (404)
```json
{
  "error": "Snippet not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented, but should be added in production.

## Timeout

Code execution has a 10-second timeout to prevent infinite loops.

## Security Notes

1. Always use HTTPS in production
2. Store JWT tokens securely
3. Validate all inputs on the server side
4. Sanitize user code before execution
5. Implement rate limiting for API endpoints

