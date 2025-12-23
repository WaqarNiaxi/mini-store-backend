import { Router } from "express";
import { GIFT_ROUTES } from "../../routes/routes";
import { requireAuth } from "../../middlewares/auth.middleware";
import { createGift, getGiftList } from "./gift.controller";

const router = Router();
/**
 * @swagger
 * /api/gift:
 *   post:
 *     summary: Send a gift to another user
 *     tags: [Gift]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - recipientId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "12"
 *               recipientId:
 *                 type: string
 *                 example: "uuid-user-id"
 *     responses:
 *       201:
 *         description: Gift sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     price:
 *                       type: number
 *                 recipient:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or recipient not found
 */
router.post(GIFT_ROUTES.gift, requireAuth, createGift);



/**
 * @swagger
 * /api/gift:
 *   get:
 *     summary: Get All Gift List
 *     tags: [Gift]
 *     responses:
 *       200:
 *         description: User List
 *       401:
 *         description: Unauthorized
 */
router.get(GIFT_ROUTES.gift, requireAuth, getGiftList);

export default router;
