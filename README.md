# Full-Stack Auth System — 100xDevs Cohort 3.0

A simple full-stack authentication system built while learning the MERN
stack fundamentals — covers signup, signin (JWT-based), protected routes,
and connecting a frontend to a backend.

## Features

- User signup and signin
- JWT-based authentication
- Protected `/me` route to fetch logged-in user's info
- Logout functionality
- Custom middleware for route protection and request logging

## Tech Stack

- **Backend:** Node.js, Express.js, JWT (jsonwebtoken), dotenv
- **Frontend:** HTML, JavaScript, Axios

## How to run locally

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file with `JWT_SECRET=your_secret_here`
4. Run `node index.js`
5. Open `http://localhost:3000` in your browser

## What I learned

- How JWT-based authentication works end-to-end
- Writing custom Express middleware (logging, auth checks)
- Connecting a vanilla JS frontend to an Express backend via Axios
- Managing secrets with environment variables (dotenv)

## Status

🚧 Learning project — Week 6, Day 2 (6.2), 100xDevs Cohort 3.0 (self-directed)
