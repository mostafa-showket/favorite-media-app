import express from "express";
import cors from "cors";
import mediaRoutes from "./routes/media";

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:5173", // Vite dev server default port
  credentials: true
}));

app.use(express.json());
app.use("/api", mediaRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
