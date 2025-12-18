export enum TransactionType {
  PURCHASE = "PURCHASE",
  GIFT_SENT = "GIFT_SENT",
  GIFT_RECEIVED = "GIFT_RECEIVED",
  TRANSFER_SENT = "TRANSFER_SENT",
  TRANSFER_RECEIVED = "TRANSFER_RECEIVED",
}

// DTO for creating a wallet transaction
export interface CreateWalletTransactionDto {
  userId: string;
  type: TransactionType;
  amount: number;
  description?: string;
}

// DTO for updating a wallet transaction
export interface UpdateWalletTransactionDto {
  type?: TransactionType;
  amount?: number;
  description?: string;
}
