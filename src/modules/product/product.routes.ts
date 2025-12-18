import { Router } from "express";
import { PRODUCT_ROUTES } from "../../routes/routes";
import { getProduct } from "./product.controller";

const router = Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get Product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Product List
 *       401:
 *         description: Unauthorized
 */

router.get(PRODUCT_ROUTES.PRODUCT, getProduct);

export default router;
