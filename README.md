# Node.js Email Authentication System

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-6.x-orange.svg)](https://nodemailer.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-darkgreen.svg)](https://www.mongodb.com/)

## Overview

This project implements a secure email authentication system using Node.js and Nodemailer. It provides user registration with email verification, password reset functionality, and secure authentication flows. The system can be integrated into any web application requiring user authentication.

## Table of Contents

- [Node.js Email Authentication System](#nodejs-email-authentication-system)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Email Service Configuration](#email-service-configuration)
    - [Security Configuration](#security-configuration)
  - [API Endpoints](#api-endpoints)
  - [Email Templates](#email-templates)
  - [Security Considerations](#security-considerations)
  - [Usage Examples](#usage-examples)
    - [Registration Process](#registration-process)
    - [Password Reset Process](#password-reset-process)
  - [Development](#development)
    - [Running in Development Mode](#running-in-development-mode)
    - [Testing Email Functionality](#testing-email-functionality)
  - [Deployment](#deployment)
    - [Heroku](#heroku)
    - [Security in Production](#security-in-production)

## Features

- User registration with email verification
- Secure login system
- Password reset via email
- Token-based authentication
- Email notifications for account activities
- Session management
- Protection against common security vulnerabilities
- Customizable email templates

## Technology Stack

- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **Email Templates**: Handlebars/EJS

## Project Structure

```
email-auth/
│
├── config/
│   ├── db.js                # Database connection configuration
│   └── email.js             # Email service configuration
│
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
│
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── validation.js        # Input validation middleware
│
├── models/
│   ├── User.js              # User data model
│   └── Token.js             # Verification token model
│
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── userRoutes.js        # User management routes
│
├── utils/
│   ├── emailTemplates/      # Email template files
│   ├── emailService.js      # Email sending service
│   └── tokenService.js      # Token generation and verification
│
├── .env                     # Environment variables (not in repo)
├── .gitignore               # Git ignore file
├── server.js                # Main application entry point
└── package.json             # Project dependencies and scripts
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cnosmn/mail-autantication-nodejs-app.git
cd mail-autantication-nodejs-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/email-auth?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Your App <your-email@gmail.com>

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
```

## Configuration

### Email Service Configuration

This project uses Nodemailer to send emails. To configure your email service:

1. For Gmail:
   - Enable 2-factor authentication in your Google account
   - Generate an app password
   - Use this app password in your `.env` file

2. For other email providers:
   - Update the EMAIL_SERVICE variable in your `.env` file
   - Provide appropriate credentials

### Security Configuration

- The JWT_SECRET should be a strong, random string
- In production, set secure cookies and use HTTPS
- Consider implementing rate limiting to prevent abuse

## API Endpoints

| Method | Endpoint                    | Description                           | Auth Required |
|--------|----------------------------|---------------------------------------|--------------|
| POST   | /api/auth/register         | Register a new user                   | No           |
| POST   | /api/auth/verify-email     | Verify email with token               | No           |
| POST   | /api/auth/login            | Login user                            | No           |
| POST   | /api/auth/forgot-password  | Request password reset                | No           |
| POST   | /api/auth/reset-password   | Reset password with token             | No           |
| GET    | /api/auth/me               | Get current user profile              | Yes          |
| POST   | /api/auth/logout           | Logout user                           | Yes          |
| PUT    | /api/user/update-profile   | Update user profile                   | Yes          |
| PUT    | /api/user/change-password  | Change password                       | Yes          |

## Email Templates

The system sends various types of emails:

1. **Welcome Email**: Sent after registration
2. **Verification Email**: Contains a link/token to verify email address
3. **Password Reset Email**: Contains a link/token to reset password
4. **Account Activity Notifications**: Alerts about login attempts or profile changes

## Security Considerations

This authentication system implements several security best practices:

- Passwords are hashed using bcrypt before storage
- Tokens expire after a set period
- Sensitive operations require re-authentication
- Protection against brute force attacks
- CSRF protection
- Input validation on all endpoints

## Usage Examples

### Registration Process

1. User submits registration form with email and password
2. System creates a new user with "unverified" status
3. Verification email with token is sent to user
4. User clicks verification link
5. Account is activated and user can log in

### Password Reset Process

1. User requests password reset via email
2. System generates a reset token and sends email
3. User clicks reset link and enters new password
4. System updates password and invalidates the token

## Development

### Running in Development Mode

To run the application with automatic restart on file changes:

```bash
npm run dev
```

### Testing Email Functionality

For development, you can use services like Mailtrap to test email sending without delivering to real recipients.

## Deployment

### Heroku

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku and create a new app:
```bash
heroku login
heroku create your-app-name
```

3. Add your environment variables to Heroku:
```bash
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
# Add all other required environment variables
```

4. Push to Heroku:
```bash
git push heroku main
```

### Security in Production

For production environments:
- Set NODE_ENV to 'production'
- Use HTTPS only
- Consider adding rate limiting middleware
- Use a production-ready email service
- Implement logging and monitoring