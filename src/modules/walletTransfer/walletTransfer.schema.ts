import { z } from "zod";
import { TransactionType } from "@prisma/client";

// Create Wallet Transaction Validation
export const createWalletTransactionSchema = z.object({
  userId: z.string(),

  type: z.nativeEnum(TransactionType, {
    message: "Invalid transaction type",
  }),

  amount: z.number().positive("Amount must be greater than 0"),

  description: z.string().min(1, "Description cannot be empty").optional(),
});
