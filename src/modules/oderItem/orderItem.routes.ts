import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate";
import { createOrderItem } from "./orderItem.controller";
import { orderItemSchema } from "./orderItem.schema";
import { ORDER_ItEM_ROUTES } from "../../routes/routes";

const router = Router();

/**
 * @swagger
 * /api/orderItem:
 *   post:
 *     summary: Create an order
 *     tags: [orderItem]
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
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Insufficient wallet balance
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */

router.post(
  ORDER_ItEM_ROUTES.ORDER_ITEM,
  requireAuth,
  validate(orderItemSchema),
  createOrderItem
);

export default router;
