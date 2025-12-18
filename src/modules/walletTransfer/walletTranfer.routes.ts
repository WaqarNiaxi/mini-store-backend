import { Router } from "express";
import { WALLET_TRANSFER } from "../../routes/routes";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  createWalletTransfer,
  getWalletTransfer,
  getWalletTransferById,
} from "./walletTransfer.controller";
import { validate } from "../../middlewares/validate";
import { createWalletTransactionSchema } from "./walletTransfer.schema";

const router = Router();

/**
 * @swagger
 * /api/walletTransfer:
 *   get:
 *     summary: Get wallet Transfer History
 *     tags: [WalletTransfer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet Transfer history
 *       401:
 *         description: Unauthorized
 */

router.get(WALLET_TRANSFER.WALLET_TRANSFER, requireAuth, getWalletTransfer);

/**
 * @swagger
 * /api/walletTransfer/{id}:
 *   get:
 *     summary: Get wallet transfer by ID
 *     tags: [WalletTransfer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "c1f3e9b2-1234-4cde-9a12-abc123xyz"
 *     responses:
 *       200:
 *         description: Wallet transfer details
 *       404:
 *         description: Wallet transfer not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  `${WALLET_TRANSFER.WALLET_TRANSFER}:id`,
  requireAuth,
  getWalletTransferById
);

/**
 * @swagger
 * /api/walletTransfer:
 *   post:
 *     summary: Create wallet transfer transaction
 *     tags: [WalletTransfer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "b1f1e9b2-1234-4cde-9a12-abc123xyz"
 *               type:
 *                 type: string
 *                 enum:
 *                   - PURCHASE
 *                   - GIFT_SENT
 *                   - GIFT_RECEIVED
 *                   - TRANSFER_SENT
 *                   - TRANSFER_RECEIVED
 *                 example: TRANSFER_SENT
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               description:
 *                 type: string
 *                 example: "Wallet transfer to another user"
 *     responses:
 *       201:
 *         description: Wallet transaction created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post(
  WALLET_TRANSFER.WALLET_TRANSFER,
  requireAuth,
  validate(createWalletTransactionSchema),
  createWalletTransfer
);

export default router;
