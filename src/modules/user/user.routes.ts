import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { USER_ROUTES } from "../../routes/routes";
import { getProfile, updateProfile } from "./user.controller";

const router = Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get(
  USER_ROUTES.PROFILE,
  requireAuth,
  getProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.put(
  USER_ROUTES.PROFILE,
  requireAuth,
  updateProfile
);

export default router;
