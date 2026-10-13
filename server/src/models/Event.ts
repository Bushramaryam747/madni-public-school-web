import mongoose, { Document, Schema } from 'mongoose';
import { IEvent, EventCategory } from '../types/index.js';

export interface EventDocument extends Document, Omit<IEvent, '_id'> {}

const EventCategories: EventCategory[] = [
  'Annual Prize Distribution',
  'Student Achievements',
  'School Events',
  'Academic Activities',
];

const EventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    category: {
      type: String,
      required: [true, 'Event category is required'],
      enum: EventCategories,
      index: true,
    },
    date: {
      type: String,
      required: [true, 'Event date or academic term is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      maxlength: [1500, 'Description cannot exceed 1500 characters'],
    },
    badge: {
      type: String,
      trim: true,
      default: 'Annual Highlight',
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ category: 1, createdAt: -1 });

export const SchoolEvent = mongoose.model<EventDocument>('SchoolEvent', EventSchema);
