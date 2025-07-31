import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

export async function createMedia(req: AuthRequest, res: Response) {
  try {
    const {
      title,
      type,
      genre,
      director,
      budget,
      location,
      duration,
      yearOrTime,
      image,
    } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const newMedia = await prisma.media.create({
      data: {
        title,
        type,
        genre,
        director,
        budget,
        location,
        duration,
        yearOrTime,
        image,
      },
    });

    res.status(201).json({
      success: true,
      data: newMedia,
    });
  } catch (error) {
    console.error("Error creating media:", error);
    res.status(500).json({ error: "Failed to create the media item" });
  }
}

export async function getMedia(_req: AuthRequest, res: Response) {
  try {
    const mediaList = await prisma.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: mediaList,
      count: mediaList.length,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch media.",
      message: "Database connection error or server issue",
    });
  }
}

export async function updateMedia(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const {
    title,
    type,
    genre,
    director,
    budget,
    location,
    duration,
    yearOrTime,
    image,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Media ID is required",
    });
  }

  if (!title || !type) {
    return res.status(400).json({
      success: false,
      error: "Title and type are required",
    });
  }

  try {
    const updatedMedia = await prisma.media.update({
      where: { id: Number(id) },
      data: {
        title,
        type,
        genre,
        director,
        budget,
        location,
        duration,
        yearOrTime,
        image,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedMedia,
    });
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update the media item",
    });
  }
}

export async function deleteMedia(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Media ID is required" });
  }

  try {
    await prisma.media.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Media item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ error: "Failed to delete the media item" });
  }
}
