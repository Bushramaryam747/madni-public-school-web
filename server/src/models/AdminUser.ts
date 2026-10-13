import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IAdminUser } from '../types/index.js';

export interface AdminUserDocument extends Document, Omit<IAdminUser, '_id'> {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving if modified
AdminUserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password helper method
AdminUserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const AdminUser = mongoose.model<AdminUserDocument>('AdminUser', AdminUserSchema);
