import Feedback from '../models/Feedback.js';
import createError from 'http-errors';

// Get all feedback
export const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({
      status: 200,
      message: 'Success',
      data: feedback,
    });
  } catch (error) {
    next(createError(500, 'Failed to fetch feedback'));
  }
};

// Add new feedback with validation error handling
export const createFeedback = async (req, res, next) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({
      status: 201,
      message: 'Feedback created successfully',
      data: newFeedback,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: 400,
        message: 'Validation failed',
        errors,
      });
    }
    next(createError(500, 'Failed to create feedback'));
  }
};

// Get single feedback by auto-incremented id
export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findOne({ id: req.params.id });
    if (!feedback) {
      return next(createError(404, 'Feedback not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Feedback retrieved successfully',
      data: feedback,
    });
  } catch (error) {
    next(createError(500, 'Failed to fetch feedback'));
  }
};

// Update feedback by auto-incremented id with validation error handling
export const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFeedback = await Feedback.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFeedback) {
      return next(createError(404, 'Feedback not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Feedback updated successfully',
      data: updatedFeedback,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: 400,
        message: 'Validation failed',
        errors,
      });
    }
    next(createError(500, 'Failed to update feedback'));
  }
};

// Delete feedback by auto-incremented id
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findOneAndDelete({ id: req.params.id });
    if (!feedback) {
      return next(createError(404, 'Feedback not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    next(createError(500, 'Failed to delete feedback'));
  }
};
