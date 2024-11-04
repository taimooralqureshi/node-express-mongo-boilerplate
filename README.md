# Node Express MongoDB Boilerplate

A boilerplate Node.js project structured as a REST API using Express and MongoDB, complete with CRUD operations for a feedback feature. This project integrates validation, error handling, and documentation with Swagger.

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
  - [Swagger Documentation](#swagger-documentation)
- [Badges](#badges)
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

```plaintext
.
├── .env                  # Environment configuration file
├── .gitignore            # Git ignore file
├── .prettierrc           # Prettier configuration
├── eslint.config.js      # ESLint configuration
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── src
    ├── app.js            # Main application entry point
    ├── config
    │   └── db.js         # Database connection setup
    ├── controllers
    │   └── feedbackController.js  # Feedback API controller logic
    ├── middleware
    │   └── errorHandler.js  # Error handling middleware
    ├── models
    │   └── Feedback.js   # Mongoose model for feedback
    ├── routes
    │   └── feedbackRoutes.js # Routes for feedback API endpoints
    └── swagger
        └── swagger.json  # Swagger API documentation configuration
```

## API Endpoints

### Feedback API

| Method | Endpoint            | Description                         |
|--------|----------------------|-------------------------------------|
| GET    | `/api/feedback`      | Retrieve all feedback              |
| POST   | `/api/feedback`      | Add new feedback                   |
| GET    | `/api/feedback/:id`  | Retrieve specific feedback by ID   |
| PUT    | `/api/feedback/:id`  | Update feedback by ID              |
| DELETE | `/api/feedback/:id`  | Delete feedback by ID              |

### Swagger Documentation

Access the API documentation at: `http://localhost:5000/api-docs`


## Author

Taimoor Qureshi - [My Portfolio or Contact Information](taimooralqureshi.github.io)


## License

## License

This project is licensed under the MIT License. 
