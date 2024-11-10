import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import validator from 'validator'; // Import the validator package
import createError from 'http-errors';

const AutoIncrement = mongooseSequence(mongoose); // Pass mongoose here

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      validate: {
        validator: (value) => {
          // Custom validation logic if needed
          return validator.isAlpha(value.replace(/\s/g, '')); // Check if the name contains only alphabets and spaces
        },
        message: 'Name can only contain letters and spaces.',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value) => validator.isEmail(value), // Validate email format
        message: 'Invalid email format.',
      },
      immutable: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    id: {
      type: Number,
      validate: {
        validator: (value) => validator.isInt(value),
        message: 'ID must be a numeric value.',
      },
    },
  },
  {
    timestamps: true, // This will create createdAt and updatedAt fields
    versionKey: false, // Suppress the __v field
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id; // Remove _id from the response
        return ret; // Return the modified object
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret._id; // Remove _id from the response
        return ret; // Return the modified object
      },
    },
  }
);

// Add auto-increment plugin
feedbackSchema.plugin(AutoIncrement, { id: 'feedback_seq', inc_field: 'id' });

// Middleware to prevent updating the email and id fields
feedbackSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.id) {
    return next(createError(400, 'ID cannot be updated'));
  }
  if (update.email) {
    return next(createError(400, 'Email cannot be updated'));
  }

  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
