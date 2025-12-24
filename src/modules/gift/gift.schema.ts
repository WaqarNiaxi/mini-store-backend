import { z } from "zod";

export const giftSchema = z.object({
  productId: z
    .string()
    .min(1, "Product ID is required"),

  recipientId: z
    .string(),
});
