import mongoose, { Schema } from 'mongoose';

interface UserDocumentInterface extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocumentInterface>(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const UserModel =
  mongoose.models.User ||
  mongoose.model<UserDocumentInterface>('User', UserSchema);
