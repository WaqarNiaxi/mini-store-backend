import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { USER_ROUTES } from "../../routes/routes";
import { getAllUser, getProfile, updateProfile } from "./user.controller";
import { updateProfileSchema } from "./user.schema";
import { validate } from "../../middlewares/validate";

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
router.get(USER_ROUTES.PROFILE, requireAuth, getProfile);


/**
 * @swagger
 * /api/users/allUser:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User List
 *       401:
 *         description: Unauthorized
 */
router.get(USER_ROUTES.ALL_USER, getAllUser);

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
 *               email:
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
  validate(updateProfileSchema),
  updateProfile
);

export default router;
