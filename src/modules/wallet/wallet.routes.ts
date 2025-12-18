import { Router } from "express";
import { WALLET_ROUTES } from "../../routes/routes";
import { requireAuth } from "./../../middlewares/auth.middleware";
import { getProfile } from "../user/user.controller";
import { getWallet, updateWallet } from "./wallet.controller";
import { walletSchema } from "./wallet.schema";
import { validate } from "./../../middlewares/validate";

const router = Router();

/**
 * @swagger
 * /api/wallet:
 *   get:
 *      summary: Get wallet information
 *      tags: [Wallet]
 *      security:
 *        -bearerAuth: []
 *      responses:
 *        200:
 *          description: wallet info
 *        401:
 *           description: unauthorize
 */

router.get(WALLET_ROUTES.WALLET, requireAuth, getWallet);

/**
 * @swagger
 * /api/wallet:
 *   put:
 *     summary: Update wallet info
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: integer
 *     responses:
 *       200:
 *         description: wallet updated
 *       401:
 *         description: Unauthorized
 */
router.put(
  WALLET_ROUTES.WALLET,
  requireAuth,
  validate(walletSchema),
  updateWallet
);

export default router;
