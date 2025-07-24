# Full Stack Assessment Project

A modern full-stack web application built with **React + TypeScript + Vite** on the frontend and **NestJS + Prisma + MongoDB** on the backend. This project demonstrates a complete authentication system with user registration, login, and protected routes.

## 🌟 Features

### Authentication System

- ✅ **User Registration** with email, name, and password validation
- ✅ **User Login** with JWT token authentication
- ✅ **Protected Routes** with backend token validation
- ✅ **Automatic Logout** on invalid/expired tokens
- ✅ **Form Validation** with real-time feedback

### Frontend Features

- ✅ **Responsive Design** using Tailwind CSS
- ✅ **Modern UI Components** with Ant Design
- ✅ **React Router** for client-side routing
- ✅ **Custom Hooks** for separation of concerns
- ✅ **Toast Notifications** for user feedback
- ✅ **Error Handling** with specific error messages

### Backend Features

- ✅ **RESTful API** with consistent response format
- ✅ **JWT Authentication** with secure token validation
- ✅ **Input Validation** using class-validator
- ✅ **Password Hashing** with bcryptjs
- ✅ **CORS Configuration** for frontend integration
- ✅ **Error Handling** with proper HTTP status codes

## 🚀 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **js-cookie** - Cookie management

### Backend

- **NestJS** - Progressive Node.js framework
- **Prisma** - Type-safe ORM
- **MongoDB Atlas** - Cloud NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **class-validator** - Input validation
- **TypeScript** - Type safety

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas) (Free tier available)
- [Git](https://git-scm.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abdallah-hatem/full_stack_assessment.git
cd full_stack_assessment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env
```

**Backend Environment Configuration (.env):**

You need to set up **MongoDB Atlas** (recommended) and configure your environment variables:

```env
# Database Configuration
# Replace with your MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/easy_generator?retryWrites=true&w=majority&appName=Cluster0"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"
JWT_EXPIRATION_TIME="7d"

# Application Configuration
PORT=3000
NODE_ENV="development"
```

**MongoDB Atlas Setup (Required):**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (choose M0 Free tier)
3. Create a database user with username and password
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string and replace the placeholder values
6. Update the database name to `easy_generator`

**Setup Prisma and Database:**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates collections)
npx prisma db push

# Start the backend server
npm run start:dev
```

The backend will be running at `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment file
touch .env
```

**Frontend Environment Configuration (.env):**

```env
# Backend API URL
VITE_BASE_URL=http://localhost:3000
```

**Start the frontend:**

```bash
# Start the development server
npm run dev
```

The frontend will be running at `http://localhost:5173`

## 🎯 Usage

### 1. Access the Application

Open your browser and navigate to `http://localhost:5173`

### 2. User Registration

- Click on **"Sign Up"** or navigate to `/signup`
- Fill in the registration form:
  - **Email**: Valid email format required
  - **Name**: Minimum 3 characters
  - **Password**: Must be at least 8 characters with one letter, one number, and one special character
- Click **"Sign Up"** to create your account

### 3. User Login

- Navigate to `/signin` or click **"Sign In"**
- Enter your email and password
- Click **"Sign In"** to authenticate

### 4. Protected Application

- After successful login, you'll be redirected to `/app`
- This is a protected route that requires authentication
- Click **"Logout"** to end your session

### 5. Security Features

- Invalid tokens are automatically detected and cleared
- Users are redirected to login when accessing protected routes without valid authentication
- Tokens are validated with the backend on each protected route access

## 📚 API Documentation

Detailed API documentation is available in the backend directory:

- [Backend API Documentation](./backend/API_DOCUMENTATION.md)

### Quick API Reference

| Endpoint         | Method | Description       | Authentication |
| ---------------- | ------ | ----------------- | -------------- |
| `/auth/register` | POST   | Register new user | No             |
| `/auth/login`    | POST   | User login        | No             |
| `/auth/me`       | GET    | Get current user  | Yes            |

## 📁 Project Structure

```
full_stack_assessment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (signup, signin, application)
│   │   ├── services/        # API services and utilities
│   │   ├── utils/           # Utility functions and guards
│   │   ├── types/           # TypeScript type definitions
│   │   └── main.tsx         # Application entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend specific documentation
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── users/           # Users module
│   │   ├── common/          # Shared utilities and decorators
│   │   ├── config/          # Configuration files
│   │   └── main.ts          # Application entry point
│   ├── prisma/              # Database schema and migrations
│   ├── package.json         # Backend dependencies
│   ├── .env.example         # Environment variables template
│   ├── API_DOCUMENTATION.md # API documentation
│   └── README.md            # Backend specific documentation
├── README.md                # This file
└── .gitignore               # Git ignore rules
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Token Validation**: Backend validates tokens on protected routes
- **Input Validation**: Comprehensive validation on both frontend and backend
- **CORS Protection**: Configured for specific origins only
- **Auto Token Cleanup**: Invalid tokens are automatically removed

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Atlas Connection Error**

- Verify your connection string format and credentials
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure the database name is `easy_generator`

**2. CORS Errors**

- Verify that `VITE_BASE_URL` in frontend matches your backend URL
- Check that CORS is properly configured in backend for your frontend URL

**3. Authentication Issues**

- Clear browser cookies and try again
- Check that JWT_SECRET is set in backend environment
- Verify that tokens haven't expired (7 days by default)

**4. Port Conflicts**

- Backend default port: 3000
- Frontend default port: 5173
- Change ports in environment files if needed

**5. Prisma Issues**

- Run `npx prisma generate` after any schema changes
- Run `npx prisma db push` to sync schema with database
