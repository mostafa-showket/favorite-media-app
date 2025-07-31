import { Router } from "express";
import {
  createMedia,
  getMedia,
  updateMedia,
} from "../controllers/media.controller";

const router = Router();

console.log("Setting up media routes...");

// Add route debugging
router.use((req, res, next) => {
  console.log(`Media route hit: ${req.method} ${req.path}`);
  next();
});

// Test route
router.get("/test", (req, res) => {
  console.log("Test route hit!");
  res.json({ message: "Media routes are working" });
});

router.post("/media", createMedia);
router.get("/media", getMedia);
router.put("/media/:id", updateMedia);

// Add a simple test route without parameters
router.get("/media-test", (req, res) => {
  res.json({ message: "Media routes are working" });
});

console.log("Media routes configured successfully");

export default router;
