import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";


const OtpSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
     //  set: (value: string) => (value ? bcrypt.hashSync(value, 10) : undefined),
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    maxAttempts: {
      type: Number,
      default: 5,
    },
  },
  { _id: false }
);

export default OtpSchema;
