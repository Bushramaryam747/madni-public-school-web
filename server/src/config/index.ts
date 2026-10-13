import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/madni_public_school',
  jwtSecret: process.env.JWT_SECRET || 'madni_school_super_secret_jwt_key_2024_change_in_prod',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  storageProvider: (process.env.STORAGE_PROVIDER || 'local') as 'local' | 'cloudinary',
  uploadDir: path.resolve(process.cwd(), 'uploads'),
  adminSeed: {
    email: process.env.ADMIN_SEED_EMAIL || 'admin@madnipublicschool.edu.pk',
    password: process.env.ADMIN_SEED_PASSWORD || 'MadniAdmin2024!',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  email: {
    enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    toEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@madnipublicschool.edu.pk',
  },
};
