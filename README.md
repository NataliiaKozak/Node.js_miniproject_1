# Mini REST API: Auth & Posts

A simple RESTful API built with Node.js and MongoDB. Supports user registration and login with JWT authentication, and basic post management for authorized users.

## Tech Stack

- **Node.js, Express** — server and routing
- **MongoDB, Mongoose** — data storage
- **bcrypt** — password hashing
- **jsonwebtoken** — JWT authentication
- **dotenv** — environment variables

## Features

- User registration with hashed passwords
- Login with JWT token
- Protected routes for authorized users only
- Create and read posts

## Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register a new user | — |
| POST | `/auth/login` | Login and receive JWT | — |
| GET | `/posts` | Get all posts | ✅ |
| POST | `/posts` | Create a new post | ✅ |

## Testing

API tested manually via Postman.