# Favorite Media App

A full-stack application for managing your favorite media items (movies, TV shows, books, etc.) with user authentication and a modern React frontend.

## Project Structure

```
favorite-media-app/
├── favorite-media-client/     # React frontend with TypeScript
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts (auth)
│   │   ├── pages/           # Page components
│   │   ├── actions/         # API actions
│   │   └── types/           # TypeScript type definitions
└── favorite-media-server/     # Express.js backend with TypeScript
    ├── src/
    │   ├── controllers/      # Route controllers
    │   ├── middleware/       # Express middleware
    │   ├── routes/          # API routes
    │   └── validators/      # Input validation
    └── prisma/              # Database schema and migrations
```

## Features

### Backend

- **RESTful API** with Express.js and TypeScript
- **MySQL database** with Prisma ORM
- **User authentication** with JWT tokens
- **CORS enabled** for cross-origin requests
- **Comprehensive error handling** and input validation
- **Password hashing** with bcryptjs

### Frontend

- **Modern React 19** with TypeScript
- **Responsive design** with Tailwind CSS and Material-UI
- **User authentication** with context API
- **Protected routes** and loading states
- **Form handling** with React Hook Form and Zod validation
- **Infinite scroll** for media items
- **CRUD operations** for media management

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL database** (v8.0 or higher)
- **npm** or **yarn** package manager

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd favorite-media-app
```

### 2. Backend Setup

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

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/favorite_media_db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   PORT=3000
   ```

   **Important:** Replace the following:

   - `username`: Your MySQL username
   - `password`: Your MySQL password
   - `favorite_media_db`: Your database name
   - `your-super-secret-jwt-key-here`: A secure random string for JWT signing

4. **Set up the database:**

   ```bash
   # Generate Prisma client
   npm run generate

   # Run database migrations
   npm run migrate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`

### 3. Frontend Setup

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

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user (protected)
- `GET /api/auth/profile` - Get user profile (protected)

### Media Management

- `GET /api/media` - Get all media items (protected)
- `POST /api/media` - Create a new media item (protected)
- `PUT /api/media/:id` - Update a media item (protected)
- `DELETE /api/media/:id` - Delete a media item (protected)

## Database Schema

The application uses a MySQL database with the following tables:

### User Table

```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- createdAt
```

### Media Table

```sql
- id (Primary Key)
- title
- genre
- type
- director
- budget
- location
- duration
- yearOrTime
- image
- createdAt
```

## Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Zod** - Input validation

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Data fetching
- **Vite** - Build tool

## Development Scripts

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm run generate     # Generate Prisma client
npm run migrate      # Run database migrations
npm run pull         # Pull database schema changes
```

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Authentication Flow

1. **Registration:** Users can create an account with email and password
2. **Login:** Users authenticate with email/password and receive a JWT token
3. **Protected Routes:** All media operations require authentication
4. **Token Storage:** JWT tokens are stored in localStorage
5. **Auto-logout:** Invalid tokens automatically log users out

## Troubleshooting

### Database Connection Issues

- Ensure MySQL is running and accessible
- Check your `.env` file has the correct database URL
- Verify database credentials and permissions
- Run `npm run generate` and `npm run migrate` to ensure schema is up to date

### CORS Issues

- The server is configured to accept requests from `http://localhost:5173`
- If using a different port, update the CORS configuration in `server/src/index.ts`

### Authentication Issues

- Ensure JWT_SECRET is set in your `.env` file
- Check that tokens are being sent in request headers
- Verify token expiration and validity

### API Connection Issues

- Ensure both client and server are running simultaneously
- Check that the server is running on port 3000
- Verify API endpoints in the client code match server routes
- Check browser console for CORS or network errors

### Build Issues

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`
- Check TypeScript configuration in `tsconfig.json`

## Production Deployment

### Backend Deployment

1. Set up production environment variables
2. Run `npm run build` to compile TypeScript
3. Use PM2 or similar process manager
4. Set up reverse proxy (nginx) if needed

### Frontend Deployment

1. Run `npm run build` to create production build
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
