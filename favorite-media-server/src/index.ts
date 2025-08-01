import express from "express";
import cors from "cors";
import mediaRoutes from "./routes/media";
import authRoutes from "./routes/auth";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
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

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});