import { z } from "zod";

export const creditTransferSchema = z.object({
  recipientId: z
    .string(),

  amount: z
    .number()
    .positive("Amount must be greater than 0"),
});
