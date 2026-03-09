import { z } from "zod";

export const surveySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  seeking: z
    .string()
    .min(1, "Please select what you are seeking"),

  areaOfInterest: z
    .array(z.string())
    .min(1, "Select at least one area of interest"),

  country: z
    .union([
      z.string().trim().min(1, "Country is required"),
      z.object({
        code: z.string(),
        nameEn: z.string()
      }).transform(obj => obj.code)
    ])
    .refine((val) => val && val.length > 0, {
      message: "Country is required"
    }),

  languagePreference: z.object({
    selected: z
      .string()
      .min(1, "Please select a language"),

    custom: z.string().optional()
  }).refine(
    (data) =>
      data.selected !== "Other" ||
      (data.custom && data.custom.trim().length > 1),
    {
      message: "Please specify the language",
      path: ["custom"]
    }
  ),

  grow: z
    .array(z.string())
    .min(1, "Select at least one growth goal"),

  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" })
  })
});