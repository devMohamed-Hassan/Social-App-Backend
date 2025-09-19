import { model, Schema } from "mongoose";
import OtpSchema from "./otp.model";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  otp?: {
    code: string;
    expiresAt: Date;
    verified: boolean;
    attempts: number;
    maxAttempts: number;
  };
  isVerified: boolean;
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
    isVerified: { type: Boolean, default: false },
    otp: OtpSchema,
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
