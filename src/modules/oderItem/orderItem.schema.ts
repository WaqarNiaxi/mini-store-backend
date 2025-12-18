import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).optional(),
});
