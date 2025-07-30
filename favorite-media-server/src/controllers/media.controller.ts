import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMedia(req: Request, res: Response) {
  try {
    const { title, type, genre, director, budget, location, duration, yearOrTime, image } = req.body;
      
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
        image 
      },
    });

    res.status(201).json(newMedia);
  } catch (error) {
    console.error("Error creating media:", error);
    res.status(500).json({ error: "Failed to create the media item" });
  }
}

export async function getMedia(_req: Request, res: Response) {
  try {
    const mediaList = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json({
      success: true,
      data: mediaList,
      count: mediaList.length
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch media.",
      message: "Database connection error or server issue"
    });
  }
}
