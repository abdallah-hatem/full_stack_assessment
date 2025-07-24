# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "Password123!"
}
```

**Validation Rules:**
- `email`: Must be a valid email format
- `name`: Minimum 3 characters
- `password`: 
  - Minimum 8 characters
  - At least one letter
  - At least one number  
  - At least one special character

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your account has been created successfully",
  "statusCode": 201,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d5f9b8c8f4a2b4c8f4a2b4",
      "email": "user@example.com",
      "name": "User Name",
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    }
  },
  "timestamp": "2023-06-25T10:30:00.000Z",
  "path": "/auth/register"
}
```

**Error Response (409 - User Exists):**
```json
{
  "success": false,
  "message": "User with this email already exists",
  "statusCode": 409
}
```

**Error Response (400 - Validation Error):**
```json
{
  "message": [
    "Password must be at least 8 characters long",
    "Password must contain at least one letter, one number, and one special character"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Validation Rules:**
- `email`: Must be a valid email format
- `password`: Required (same validation as register)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Welcome back! Login successful",
  "statusCode": 200,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d5f9b8c8f4a2b4c8f4a2b4",
      "email": "user@example.com",
      "name": "User Name",
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    }
  },
  "timestamp": "2023-06-25T10:30:00.000Z",
  "path": "/auth/login"
}
```

**Error Response (401 - Invalid Credentials):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "statusCode": 401
}
```

---

### GET /auth/me
Get current authenticated user information.

**Headers Required:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If you see this, you are authenticated",
  "statusCode": 200,
  "data": [],
  "timestamp": "2023-06-25T10:30:00.000Z",
  "path": "/auth/me"
}
```

**Error Response (401 - Unauthorized):**
```json
{
  "success": false,
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

## Response Format

All API responses follow this consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "statusCode": 200,
  "data": <response_data>,
  "timestamp": "2023-06-25T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2023-06-25T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input data |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Resource not found |
| 409  | Conflict - Resource already exists |
| 422  | Unprocessable Entity - Validation failed |
| 500  | Internal Server Error - Server error |

---

## CORS

CORS is enabled for:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`

Credentials are allowed for authentication.

---

## Environment Variables

Required environment variables:
```env
DATABASE_URL="mongodb://localhost:27017/your_database"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRATION_TIME="7d"
PORT=3000
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production use.

---

## Examples

### Registration Example
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "name": "John Doe", 
    "password": "SecurePass123!"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get User Example
```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer your_jwt_token_here"
``` 