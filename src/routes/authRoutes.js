import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
} from '../controllers/authController.js';

import { isUserAndAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: The role of the user (user or admin)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp of the user
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp of the user
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []  # This endpoint does not require authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: John Doe
 *             email: johndoe@example.com
 *             password: password123
 *             role: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     security: []  # This endpoint does not require authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: johndoe@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - xAuthToken: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', isUserAndAdmin, logoutUser);

/**
 * @swagger
 * /api/auth/verify-token:
 *   get:
 *     summary: Verify a user's token
 *     tags: [Auth]
 *     security:
 *       - xAuthToken: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token is not valid or not provided
 */
router.get('/verify-token', verifyToken);

export default router;
