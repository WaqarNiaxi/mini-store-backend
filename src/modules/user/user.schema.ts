import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).max(50).optional(),

    email: z
      .string()
      .email()
      .refine((val) => val.includes("@"), {
        message: "Invalid email address",
      })
      .optional(),
  })
  .strict()
  .refine((data) => data.name || data.email, {
    message: "At least one field (name or email) is required",
  });
