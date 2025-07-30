# Favorite Media App

A full-stack application for managing your favorite media items (movies, TV shows, books, etc.).

## Project Structure

```
favorite-media-app/
├── favorite-media-client/     # React frontend
└── favorite-media-server/     # Express backend
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. **Navigate to the server directory:**

   ```bash
   cd favorite-media-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `favorite-media-server` directory:

   ```
   DATABASE_URL="mysql://username:password@localhost:3306/favorite_media_db"
   ```

   Replace `username`, `password`, and database name as needed.

4. **Set up the database:**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to the client directory:**

   ```bash
   cd favorite-media-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:5173`

## Features

### Backend

- RESTful API with Express.js
- MySQL database with Prisma ORM
- CORS enabled for cross-origin requests
- Comprehensive error handling
- Input validation

### Frontend

- Modern React 19 with TypeScript
- Responsive design with Tailwind CSS
- Loading states and error handling
- Grid layout for media items
- Add new media functionality

## API Endpoints

- `GET /api/media` - Get all media items
- `POST /api/media` - Create a new media item

## Database Schema

The application uses a MySQL database with the following main table:

- `Media` - Stores media information (title, type, genre, director, etc.)
- `User` - Stores user information (for future authentication)

## Technologies Used

### Backend

- Node.js
- Express.js
- Prisma ORM
- MySQL
- TypeScript
- CORS

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Hook Form
- Material-UI components

## Development

Both the client and server support hot reloading during development. Make sure both servers are running simultaneously for full functionality.

## Troubleshooting

1. **Database Connection Issues:**

   - Ensure MySQL is running
   - Check your `.env` file has the correct database URL
   - Run `npx prisma generate` and `npx prisma migrate dev`

2. **CORS Issues:**

   - The server is configured to accept requests from `http://localhost:5173`
   - If using a different port, update the CORS configuration in `server/src/index.ts`

3. **API Connection Issues:**
   - Ensure both client and server are running
   - Check that the server is running on port 3000
   - Verify the API endpoints in the client code

