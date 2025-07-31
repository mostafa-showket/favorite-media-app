import { Router } from "express";
import { signIn, signUp, signOut, getProfile } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/signup", signUp);
router.post("/signin", signIn);

// Protected routes
router.post("/signout", authenticateToken, signOut);
router.get("/profile", authenticateToken, getProfile);

export default router; 