import express from 'express';
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
} from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createFeedback);
router.get('/:id', getFeedback);
router.delete('/:id', deleteFeedback);
router.put('/:id', updateFeedback);

export default router;
