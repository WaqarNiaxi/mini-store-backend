import { z } from "zod";

export const orderSchema = z.object({
  totalAmount: z.number().min(0, "Balance must be >= 0"),
});
