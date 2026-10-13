import mongoose from 'mongoose';
import { config } from './index.js';

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${config.mongoUri}.`);
    console.warn(`[MongoDB Warning] Reason: ${error.message}`);
    console.warn(`[MongoDB Note] The server will still run and serve static content & mock storage fallback where applicable.`);
    return false;
  }
};

export const getDbStatus = (): boolean => isConnected;
