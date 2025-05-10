# Full Stack Blog Application (Frontend & Backend)

This is a full-stack blog application with a React frontend and a Node.js (Express) backend. The project allows users to create, read, update, and delete blog posts with tags and authentication.

## Features

- **Frontend (React)**
  - User authentication (Login/Logout).
  - View, create, edit, and delete blog posts.
  - Display blog posts with tags.
  - Responsive design for different screen sizes.

- **Backend (Node.js/Express)**
  - RESTful API for CRUD operations on posts.
  - JWT-based user authentication.
  - Serverless functions for the backend on Vercel (optional for serverless deployment).

## Tech Stack

- **Frontend**: React, React Router, Bootstrap (for styling).
- **Backend**: Node.js, Express.js, JWT (for authentication).
- **Database**: MongoDB (or PostgreSQL/other based on your setup).
- **Deployment**:
  - Frontend: Vercel
  - Backend: Vercel (for serverless functions) or any backend service (e.g., Heroku, DigitalOcean).

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- 
## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/Manzoor-Khiliriya/mini-blog.git
cd mini-blog

### for backend
cd blog-api
### 1. set up environment variables for connecting to your postgrql db
### 2. npm run dev

### for frontend
cd blog-client
### 1. npm run dev
### 2. click link
