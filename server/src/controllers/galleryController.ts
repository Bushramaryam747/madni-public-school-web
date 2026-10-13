import { Request, Response } from 'express';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { GalleryImage } from '../models/GalleryImage.js';
import { getDbStatus } from '../config/db.js';
import { mockStore } from '../utils/mockDataStore.js';
import { config } from '../config/index.js';
import { GalleryCategory } from '../types/index.js';

export const getGalleryImages = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (getDbStatus()) {
      const filter: any = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: images });
    } else {
      const images = mockStore.getGallery(category as string);
      return res.json({ success: true, data: images });
    }
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve gallery images' });
  }
};

const createGallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(120),
  category: z.enum([
    'All',
    'Classroom',
    'Learning',
    'Events',
    'Prize Distribution',
    'Sports',
    'School Building',
  ]),
  alt: z.string().min(3, 'Alt text is required for accessibility').max(250),
  imageUrl: z.string().optional(),
});

export const createGalleryImage = async (req: Request, res: Response) => {
  try {
    const parseResult = createGallerySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    const { title, category, alt, imageUrl: providedUrl } = parseResult.data;
    let finalImageUrl = providedUrl;

    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'An image file upload or image URL must be provided',
      });
    }

    if (getDbStatus()) {
      const newImage = await GalleryImage.create({
        title,
        category: category as GalleryCategory,
        alt,
        imageUrl: finalImageUrl,
      });
      return res.status(201).json({
        success: true,
        message: 'Image added to gallery',
        data: newImage,
      });
    } else {
      const newImage = mockStore.addGallery({
        title,
        category: category as GalleryCategory,
        alt,
        imageUrl: finalImageUrl,
      });
      return res.status(201).json({
        success: true,
        message: 'Image added to gallery',
        data: newImage,
      });
    }
  } catch (error: any) {
    console.error('Error uploading gallery image:', error);
    return res.status(500).json({ success: false, message: 'Failed to create gallery image' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const item = await GalleryImage.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Gallery image not found' });
      }

      // If local uploaded file, remove from disk
      if (item.imageUrl.startsWith('/uploads/')) {
        const localPath = path.join(config.uploadDir, path.basename(item.imageUrl));
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath);
        }
      }

      await GalleryImage.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Gallery image deleted successfully' });
    } else {
      const deleted = mockStore.deleteGallery(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Gallery image not found' });
      }
      return res.json({ success: true, message: 'Gallery image deleted successfully' });
    }
  } catch (error: any) {
    console.error('Error deleting gallery image:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete gallery image' });
  }
};
