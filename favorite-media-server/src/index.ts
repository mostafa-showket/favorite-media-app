import express from "express";
import cors from "cors";
import mediaRoutes from "./routes/media";
import authRoutes from "./routes/auth";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server default port
    credentials: true,
  })
);

app.use(express.json());

// Add route debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

console.log("Mounting media routes at /api");
app.use("/api", mediaRoutes);
console.log("Media routes mounted successfully");

console.log("Mounting auth routes at /api/auth");
app.use("/api/auth", authRoutes);
console.log("Auth routes mounted successfully");

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Catch-all route for debugging
app.use("*", (req, res) => {
  console.log(`404 - Method: ${req.method}, Path: ${req.path}`);
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.path,
    availableRoutes: [
      "GET /api/media",
      "POST /api/media",
      "PUT /api/media/:id",
      "DELETE /api/media/:id",
      "POST /api/auth/signup",
      "POST /api/auth/signin",
      "POST /api/auth/signout",
      "GET /api/auth/profile",
    ],
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Available routes:");
  console.log("  GET  /api/media");
  console.log("  POST /api/media");
  console.log("  PUT  /api/media/:id");
  console.log("  DELETE  /api/media/:id");
  console.log("  POST /api/auth/signup");
  console.log("  POST /api/auth/signin");
  console.log("  POST /api/auth/signout");
  console.log("  GET  /api/auth/profile");
});
