import { model, Schema, Document } from "mongoose";
import OtpSchema from "./otp.model";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  age?: number;
  otp?: {
    code: string;
    expiresAt: Date;
    verified: boolean;
    attempts: number;
    maxAttempts: number;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true, select: false },

    phone: { type: String, unique: true, sparse: true },

    age: { type: Number, min: 18, max: 100 },

    isVerified: { type: Boolean, default: false },

    otp: OtpSchema,
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
