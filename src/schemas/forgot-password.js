import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email address"),
});
