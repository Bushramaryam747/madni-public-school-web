import mongoose, { Document, Schema } from 'mongoose';
import { IGalleryImage, GalleryCategory } from '../types/index.js';

export interface GalleryImageDocument extends Document, Omit<IGalleryImage, '_id'> {}

const GalleryCategories: GalleryCategory[] = [
  'All',
  'Classroom',
  'Learning',
  'Events',
  'Prize Distribution',
  'Sports',
  'School Building',
];

const GalleryImageSchema = new Schema<GalleryImageDocument>(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    category: {
      type: String,
      required: [true, 'Image category is required'],
      enum: GalleryCategories,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL or path is required'],
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
      default: '',
    },
    alt: {
      type: String,
      required: [true, 'Accessible alt text is required'],
      trim: true,
      maxlength: [250, 'Alt text cannot exceed 250 characters'],
    },
  },
  {
    timestamps: true,
  }
);

GalleryImageSchema.index({ category: 1, createdAt: -1 });

export const GalleryImage = mongoose.model<GalleryImageDocument>(
  'GalleryImage',
  GalleryImageSchema
);
