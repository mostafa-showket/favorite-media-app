import { Router } from "express";
import { createMedia } from "../controllers/media.controller";

const router = Router();

router.post("/media", createMedia);

export default router;
