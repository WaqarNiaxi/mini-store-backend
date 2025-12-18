import { Router } from "express";
import { ORDER_ROUTES } from "../../routes/routes";
import { validate } from "../../middlewares/validate";
import { createOrder, getOrderList } from "./order.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

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
 *               - userId
 *               - totalAmount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "b1f1e9b2-1234-4cde-9a12-abc123xyz"
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
router.post(ORDER_ROUTES.ORDER, requireAuth, createOrder);

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
