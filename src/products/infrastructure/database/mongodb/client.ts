import * as mongoose from 'mongoose';
import { config } from '@/config/config';

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(config.mongoDbUri);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
