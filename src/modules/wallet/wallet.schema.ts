import { z } from "zod";

export const walletSchema = z.object({
  balance: z.number().min(0, "Balance must be >= 0"),
});
