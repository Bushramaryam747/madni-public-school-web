import mongoose, { Document, Schema } from 'mongoose';
import { IInquiry } from '../types/index.js';

export interface InquiryDocument extends Document, Omit<IInquiry, '_id'> {}

const InquirySchema = new Schema<InquiryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Parent/Guardian name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [100, 'Email cannot exceed 100 characters'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Inquiry message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'archived'],
      default: 'new',
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ createdAt: -1 });

export const Inquiry = mongoose.model<InquiryDocument>('Inquiry', InquirySchema);
