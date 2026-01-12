import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { createCreditTransfer, getCreditTransferList } from "./creditTransfer.controller";
import { CREDIT_TRANSFER_ROUTES } from "../../routes/routes";
import { validate } from "../../middlewares/validate";
import { creditTransferSchema } from "./creditTransfer.schema";

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
  validate(creditTransferSchema),
  createCreditTransfer
);


/**
 * @swagger
 * /api/creditTransfer:
 *   get:
 *     summary: Get All Credit Transfer List
 *     tags: [Credit Transfer]
 *     responses:
 *       200:
 *         description: Credit Transfer List
 *       401:
 *         description: Unauthorized
 */
router.get(CREDIT_TRANSFER_ROUTES.creditTransfer, requireAuth, getCreditTransferList);

export default router;
