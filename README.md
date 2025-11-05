# Social Media Platform Backend

A robust and scalable RESTful API backend for a modern social media platform, built with Node.js, Express, and TypeScript.

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [API Overview](#-api-overview)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Configuration](#-database-configuration)
- [Error Handling](#-error-handling)

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Refresh token mechanism
  - Email verification with OTP
  - Password encryption with bcrypt

- **User Management**
  - User profiles with avatars
  - Profile updates and settings
  - Friend requests and connections

- **Posts & Content**
  - Create, read, update, and delete posts
  - Image upload support via AWS S3
  - Comments and reactions
  - Content moderation

- **Real-time Chat**
  - Private messaging
  - Group chats
  - Real-time notifications via Socket.io
  - Message status tracking

- **Social Features**
  - Friend management system
  - User mentions and tagging
  - Activity feed
  - Privacy controls

## Tech Stack

- **Runtime Environment**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **Real-time Communication**: Socket.io
- **File Storage**: AWS S3
- **Email Service**: Nodemailer
- **Validation**: Zod
- **Security**: CORS, Crypto.js
- **Development Tools**: 
  - TypeScript compiler
  - Development server with hot reload

## Project Architecture

```plaintext
src/
├── bootstrap.ts          # Application bootstrapping
├── index.ts             # Entry point
├── routes.ts            # Main router configuration
├── common/              # Shared utilities and validators
├── config/              # Configuration files
├── middlewares/         # Express middlewares
├── models/              # MongoDB models
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   ├── chat/           # Chat functionality
│   ├── comment/        # Comment handling
│   ├── friend/         # Friend management
│   ├── group/          # Group chat features
│   ├── post/           # Post management
│   └── user/           # User management
├── repositories/        # Data access layer
├── services/           # Business logic
└── utils/              # Helper utilities
```

## API Overview & Examples

### Authentication API

#### Sign Up

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "Mohamed Hassan",
  "email": "dev.mohamed.hassan@example.com",
  "password": "StrongPassword123",
  "confirmPassword": "StrongPassword123",
  "age": 72,
  "gender": "male",
  "phone": "+201234567890"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "dev.mohamed.hassan@example.com",
  "password": "StrongPassword123"
}
```

### Posts API

#### Create Post

```http
POST /posts
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "content": "Hello everyone! This is my first post.",
  "visibility": "public",
  "media": ["image1.jpg", "image2.jpg"]
}
```

#### Get User Posts

```http
GET /posts/user/:userId
Authorization: Bearer <your_access_token>
```

### Chat API

#### Send Private Message

```http
POST /chat/message
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "recipientId": "user123",
  "content": "Hey! How are you?",
  "type": "text"
}
```

#### Create Group Chat

```http
POST /groups
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "name": "Project Team",
  "members": ["user123", "user456", "user789"],
  "description": "Group for our awesome project"
}
```

### Friends API

#### Send Friend Request

```http
POST /friends/request
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "recipientId": "user123"
}
```

#### Accept Friend Request

```http
PUT /friends/request/accept
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "requestId": "request123"
}
```

For complete API documentation including response formats, error codes, and more endpoints, please refer to our [API Documentation](./docs/api.md).

## 🔑 Environment Variables

Create a `.env` file with the following variables:

```plaintext
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000

# Authentication
SALT_ROUNDS=5
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
BEARER_KEY=your_bearer_key

# AWS S3 Configuration
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=your_bucket_name

# Email Configuration
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# Encryption
CRYPTO_KEY=your_crypto_key
```

## Database Configuration

This project uses MongoDB as its database. The connection is configured in `src/config/db.ts`. Make sure to:

1. Have MongoDB installed locally or use MongoDB Atlas
2. Set the `MONGO_URI` in your `.env` file
3. The application will automatically handle connection and schema setup

## Error Handling

The application implements a centralized error handling mechanism:

- Custom `AppError` class for error creation
- Global error handling middleware
- Structured error responses
- Validation error handling with Zod
- Async error catching with express middleware

