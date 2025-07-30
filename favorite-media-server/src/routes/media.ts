import { Router } from "express";
import { createMedia, getMedia } from "../controllers/media.controller";

const router = Router();

router.post("/media", createMedia);
router.get("/media", getMedia);

export default router;
