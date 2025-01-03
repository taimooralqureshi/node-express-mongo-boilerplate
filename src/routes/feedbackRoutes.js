import express from 'express';
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
} from '../controllers/feedbackController.js';
import { isUserAndAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the feedback
 *         name:
 *           type: string
 *           description: The name of the person providing feedback
 *         email:
 *           type: string
 *           description: The email of the person providing feedback
 *         message:
 *           type: string
 *           description: The feedback message
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp of the feedback
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp of the feedback
 */

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get All Feedback
 *     tags: [Feedback]
 *     security: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 *       500:
 *         description: Error fetching feedback
 */
router.get('/', getAllFeedback); // Public route

/**
 * @swagger
 * /api/feedback/{id}:
 *   get:
 *     summary: Get Feedback by ID
 *     tags: [Feedback]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feedback to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Error fetching feedback
 */
router.get('/:id', getFeedback); // Public route

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Create Feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the person providing feedback
 *               email:
 *                 type: string
 *                 description: The email of the person providing feedback
 *               message:
 *                 type: string
 *                 description: The feedback message
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Error saving feedback
 */
router.post('/', isUserAndAdmin, createFeedback); // Protected route

/**
 * @swagger
 * /api/feedback/{id}:
 *   put:
 *     summary: Update Feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       400:
 *         description: Error updating feedback
 *       404:
 *         description: Feedback not found
 */
router.put('/:id', isUserAndAdmin, updateFeedback); // Protected route

/**
 * @swagger
 * /api/feedback/{id}:
 *   delete:
 *     summary: Delete Feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feedback to delete
 *     responses:
 *       204:
 *         description: Feedback deleted successfully
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Error deleting feedback
 */
router.delete('/:id', isUserAndAdmin, deleteFeedback); // Protected route

export default router;
