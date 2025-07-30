import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMedia(req: Request, res: Response) {
  try {
    const { title, type, genre } = req.body;
    const newMedia = await prisma.media.create({
      data: { title, type, genre },
    });

    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the media item" });
  }
}

export async function getMedia(_req: Request, res: Response) {
  try {
    const mediaList = await prisma.media.findMany();
    res.status(200).json(mediaList);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch media." });
  }
}
