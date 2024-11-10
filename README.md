# Node Express MongoDB JS Boilerplate

A comprehensive boilerplate for a Node.js project, architected as a REST API utilizing Express and MongoDB. This boilerplate features full CRUD operations for a feedback system and seamlessly integrates data validation, robust error handling, and comprehensive API documentation via Swagger.

## Tech Stack

<img src="https://img.icons8.com/?size=512&id=108784&format=png" alt="javascript Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=hsPbhkOH4FMe&format=png" alt="Node.js Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=kg46nzoJrmTR&format=png" alt="Express Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=74402&format=png" alt="MongoDB Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=rHpveptSuwDz&format=png" alt="JWT Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=rdKV2dee9wxd&format=png" alt="Swagger Logo" width="50" height="50">
<img src="https://prettier.io/icon.png" alt="Prettier Logo" width="50" height="50">
<img src="https://img.icons8.com/?size=256&id=RBnCyho7WRn7&format=png" alt="ESLint Logo" width="50" height="50">

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Feedback API](#feedback-api)
  - [Auth API](#auth-api)
  - [Swagger Documentation](#swagger-documentation)
- [Author](#author)
- [License](#license)

## Features

- **REST API** with Express
- **MongoDB** data storage with Mongoose ORM
- **Data validation** using Validator.js
- **Error handling** middleware for smooth error responses
- **API Documentation** with Swagger
- **Environment Configuration** via dotenv
- **Code Quality** tools: ESLint and Prettier
- **User Authentication** with JSON Web Tokens (JWT)
- **Authorization Middleware** for role-based access control
- **Password Hashing** using bcrypt for secure password management
- **Session Management** using MongoDB TTL (Time-To-Live) indexes for automatic session expiration


## Prerequisites

- Node.js (v14 or higher)
- MongoDB database

## Getting Started

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```sh
   cd node-express-mongo-boilerplate
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Configure environment variables:**
   
   Create a `.env` file in the root directory with the following keys:

    ```env
    PORT=5000
    MONGO_URI=<your_mongo_connection_string>
    NODE_ENV="development"
    JWT_SECRET=<your secret string>
    SESSION_EXP_SECS=<session expiry in secs>
    ```

### Running the Server

Start the development server:
```sh
npm run dev
```

The server will start on `http://localhost:5000` by default.

### Available Scripts

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm start`       | Start the production server              |
| `npm run dev`     | Start the server with Nodemon (development) |
| `npm test`        | Run tests                                |
| `npm run lint`    | Lint code using ESLint                   |
| `npm run format`  | Format code with Prettier                |

## Project Structure

```bash
.
├── .env                     # Environment configuration file
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── eslint.config.js         # ESLint configuration
├── LICENSE                  # License file
├── package-lock.json        # Exact versions of npm dependencies
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
└── src
    ├── app.js               # Main application entry point
    ├── config
    │   ├── db.js            # Database connection setup
    │   └── swagger.js       # Swagger configuration
    ├── controllers
    │   ├── authController.js    # Authentication controller logic
    │   └── feedbackController.js # Feedback API controller logic
    ├── middleware
    │   ├── authMiddleware.js   # Authentication middleware
    │   └── errorHandler.js     # Error handling middleware
    ├── models
    │   ├── Feedback.js        # Mongoose model for feedback
    │   ├── Session.js         # Mongoose model for sessions
    │   └── User.js            # Mongoose model for users
    ├── routes
    │   ├── authRoutes.js      # Routes for authentication API endpoints
    │   └── feedbackRoutes.js  # Routes for feedback API endpoints
    └── utils
        └── helper.js         # Utility functions
```

## API Endpoints

### Feedback API

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| <span pill get></span>    | `/api/feedback`        | Retrieve all feedback            |
| <span pill get></span>    | `/api/feedback/:id`    | Retrieve specific feedback by ID |
| <span pill post></span>   | `/api/feedback`        | Add new feedback                 |
| <span pill put></span>    | `/api/feedback/:id`    | Update feedback by ID            |
| <span pill del></span> | `/api/feedback/:id`    | Delete feedback by ID            |

### Auth API

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| <span pill post></span>   | `/api/auth/register`     | Register a new user              |
| <span pill post></span>   | `/api/auth/login`        | Login a user                     |
| <span pill post></span>   | `/api/auth/logout`       | Logout a user                    |
| <span pill get></span>    | `/api/auth/verify-token` | Verify a user's token            |

---
### Swagger Documentation

Access the API documentation at: `http://localhost:5000/api-docs`


## Author

Taimoor Qureshi - [My Portfolio or Contact Information](taimooralqureshi.github.io)

## License

This project is licensed under the MIT License. 

<style>
   [pill] {
      padding: 0px 4px 2px;
      border-radius: 4px;
      color: white;
      font-weight: bold;
   }

   /* Request Types */
   [get] {
      background-color: palegreen;
   }

   [get]::after {
      content: "GET"; 
   }

   [post] {
      background-color: skyblue;
   }

   [post]::after {
      content: "POST";
   }

   [put] {
      background-color: gold;
   }

   [put]::after {
      content: "PUT";
   }

   [del] {
      background-color: tomato;
   }

   [del]::after {
      content: "DELETE";
   }
</style>
