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
