import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { createCreditTransfer } from "./creditTransfer.controller";
import { CREDIT_TRANSFER_ROUTES } from "../../routes/routes";

const router = Router();

/**
 * @swagger
 * /api/creditTransfer:
 *   post:
 *     summary: Transfer credits to another user
 *     tags: [Credit Transfer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientId
 *               - amount
 *             properties:
 *               recipientId:
 *                 type: string
 *                 example: "uuid-user-id"
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Credit transfer successful
 *       400:
 *         description: Invalid amount or insufficient balance
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipient not found
 */

router.post(
  CREDIT_TRANSFER_ROUTES.creditTransfer,
  requireAuth,
  createCreditTransfer
);

export default router;
