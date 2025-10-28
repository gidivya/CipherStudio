# CipherStudio - Code Compiler & Gallery

A full-stack web application for writing, compiling, and sharing code snippets in multiple programming languages.

## Features

- **Code Editor**: Write and execute code in Python, C++, Java, C, and JavaScript
- **User Authentication**: Register, login, and manage user accounts
- **Code Gallery**: Save and share public code snippets
- **Real-time Compilation**: Execute code and see results instantly
- **Responsive Design**: Modern UI with dark theme

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Monaco Editor
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cipherstudioapp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.template .env
   # Edit .env with your MongoDB connection string
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Deployment Guide

### Frontend (Vercel) ✅ Already Deployed
Your frontend is already deployed on Vercel. You just need to:
1. Add environment variable: `REACT_APP_API_URL` = your backend URL
2. Redeploy

### Backend Deployment Options

#### Option 1: Heroku (Recommended)
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set JWT_SECRET="your-secure-random-string"
   heroku config:set FRONTEND_URL="https://your-vercel-app.vercel.app"
   ```
5. Deploy: `git push heroku main`

#### Option 2: Railway
1. Connect GitHub repository
2. Select backend folder
3. Set environment variables in dashboard
4. Deploy automatically

#### Option 3: Render
1. Create Web Service
2. Connect repository
3. Set build/start commands
4. Configure environment variables

### Database Setup (MongoDB Atlas)

1. **Create Account**: Sign up at [MongoDB Atlas](https://mongodb.com/atlas)
2. **Create Cluster**: Choose free tier
3. **Create User**: Database user with read/write access
4. **Whitelist IPs**: Add 0.0.0.0/0 for all IPs (or specific ones)
5. **Get Connection String**: Copy the connection string

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=7d
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Code Management
- `GET /api/code` - Get public code snippets
- `POST /api/code` - Create new code snippet (auth required)
- `PUT /api/code/:id` - Update code snippet (auth required)
- `DELETE /api/code/:id` - Delete code snippet (auth required)

### Code Execution
- `POST /api/compile/execute` - Execute code

## Project Structure

```
cipherstudioapp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   ├── Procfile
│   └── .env.template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── config/
│   │   └── App.js
│   └── package.json
├── DEPLOYMENT.md
└── README.md
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` matches your Vercel URL exactly
   - Check that backend is receiving requests from correct origin

2. **Database Connection**
   - Verify MongoDB connection string
   - Check IP whitelist in Atlas
   - Ensure user has proper permissions

3. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token format in requests
   - Ensure backend is running

4. **Code Snippets Not Appearing**
   - Check if snippets are marked as public
   - Verify database connection
   - Check backend logs for errors

### Debug Steps
1. Check backend logs in hosting platform
2. Use browser dev tools to inspect network requests
3. Test API endpoints with Postman/curl
4. Verify environment variables are set correctly

## Security Notes

- Use strong, unique JWT secrets in production
- Enable HTTPS for both frontend and backend
- Restrict MongoDB Atlas IP whitelist appropriately
- Use environment variables for all sensitive data
- Consider implementing rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For deployment issues, check:
- Backend logs for error messages
- Frontend console for JavaScript errors
- Network tab for failed API requests
- Environment variable configuration

Remember to replace placeholder URLs and secrets with your actual values!