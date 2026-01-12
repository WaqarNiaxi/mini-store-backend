import { Router } from "express";
import { ORDER_ROUTES } from "../../routes/routes";
import { validate } from "../../middlewares/validate";
import { createOrder, getOrderList } from "./order.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { orderSchema } from "./order.schema";

const router = Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalAmount
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 example: 150.75
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  ORDER_ROUTES.ORDER,
  requireAuth,
  validate(orderSchema),
  createOrder
);

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get List
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order List details
 *       404:
 *         description: Order List not found
 *       401:
 *         description: Unauthorized
 */
router.get(ORDER_ROUTES.ORDER, requireAuth, getOrderList);

export default router;
