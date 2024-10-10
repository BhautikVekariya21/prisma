# Prisma User Authentication API

This is a simple API built with **Node.js**, **Express**, and **Prisma** that provides user authentication functionality, including user signup, login, and JWT token-based authentication. It uses **MongoDB** as the database with Prisma ORM.

## Features

- User signup with validation
- User login with JWT token generation
- Middleware for protected routes using authentication
- Full RESTful API for creating, updating, and deleting posts

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Cookie-based token management

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)
- [Prisma](https://www.prisma.io/) (v3 or higher)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BhautikVekariya21/prisma.git
   cd prisma
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your MongoDB connection URL and JWT secret:

   ```plaintext
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
   JWT_SECRET="your_jwt_secret_key"
   ```

4. **Initialize Prisma:**

   ```bash
   npx prisma generate
   ```

5. **Run database migrations (if needed):**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the server:**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:8000`.

## API Endpoints

### User Authentication Routes

#### 1. Signup

- **Endpoint**: `/api/signup`
- **Method**: `POST`
- **Description**: Creates a new user account and returns a JWT token.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_generated_jwt_token"
  }
  ```

#### 2. Login

- **Endpoint**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in an existing user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_generated_jwt_token"
  }
  ```

#### 3. Logout

- **Endpoint**: `/api/logout`
- **Method**: `GET`
- **Description**: Logs out the user by clearing the authentication token.

### Post Management Routes (Protected)

These routes require the user to be authenticated with a valid JWT token.

#### 1. Create Post

- **Endpoint**: `/api/post/create`
- **Method**: `POST`
- **Description**: Creates a new post for the logged-in user.
- **Request Body**:
  ```json
  {
    "slug": "my-first-post",
    "title": "My First Post",
    "body": "This is the body of the post",
    "authorId": "userId_here"
  }
  ```

#### 2. Update Post

- **Endpoint**: `/api/post/update/:id`
- **Method**: `PUT`
- **Description**: Updates an existing post.
- **Request Body**:
  ```json
  {
    "title": "Updated Post Title",
    "body": "Updated post content"
  }
  ```

#### 3. Delete Post

- **Endpoint**: `/api/post/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes a post by its ID.

#### 4. Get All Posts

- **Endpoint**: `/api/post/get`
- **Method**: `GET`
- **Description**: Fetches all posts.

## File Structure

```
├── prisma
│   └── schema.prisma       # Prisma schema file defining data models
├── controllers
│   ├── userControllers.js  # User signup, login, logout logic
│   └── postControllers.js  # Post CRUD operations
├── middleware
│   └── isLoggedIn.js       # Middleware for protected routes
├── routes
│   ├── userRoutes.js       # User-related routes
│   └── postRoutes.js       # Post-related routes
├── utils
│   └── cookieToken.js      # Utility function to set JWT in cookies
├── .env                    # Environment variables (DB URL, JWT secret)
├── index.js                # Entry point of the API
└── README.md               # Project documentation
```

## Debugging

To aid in debugging, there are several `console.log` statements throughout the codebase, particularly in the following areas:

- **User signup**: Logs the request body, the `Prisma` client, and the created user.
- **Error handling**: All errors are logged to the console with helpful information.

Example log during signup:

```bash
Received signup request: { name: 'John', email: 'john@example.com' }
Prisma client: PrismaClient {}
User created successfully: { id: '...', name: 'John', email: 'john@example.com', password: '...' }
```

This `README.md` provides an overview of the project, setup steps, and usage details. It should help other developers understand the repository and use it effectively.
