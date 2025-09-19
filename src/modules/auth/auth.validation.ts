import { z } from "zod";

export const signupSchema = {
  body: z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters long")
        .max(30, "First name must not exceed 30 characters"),

      lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters long")
        .max(30, "Last name must not exceed 30 characters"),

      email: z.string().trim().email("Please enter a valid email address"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")
        .regex(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
          "Password must contain at least one uppercase letter, one number, and one special character"
        ),

      rePassword: z.string().trim(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    }),
};
