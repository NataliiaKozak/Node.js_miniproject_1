Mini REST API: Auth & Posts (Node.js + MongoDB)

A simple RESTful API in Node.js for registration, login, and post management.
Users can register and log in with JWT. After login, users can create posts stored in MongoDB.
Passwords are hashed with bcrypt.

Features
• User registration with password hashing (bcrypt).
• Login with JWT token; protected routes for posts.
• Create and read posts (only for authorized users).
• Simple routing with Express Router: /auth, /posts.

Tech Stack
• Node.js, Express (web server, routing).
• MongoDB (data), official MongoDB driver / Mongoose (optional in future).
• bcrypt (password hashing), jsonwebtoken (JWT).
• dotenv (environment variables), Postman (API testing).

Endpoints (basic)
• POST /auth/register — create a new user (hash password, save user).
• POST /auth/login — login and receive a JWT token.
• GET /posts — get all posts (JWT required).
• POST /posts — create a new post (JWT required).
