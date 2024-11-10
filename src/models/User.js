import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import validator from 'validator';
import bcrypt from 'bcrypt';

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      validate: {
        validator: (value) => validator.isAlpha(value.replace(/\s/g, '')), // Check if the name contains only alphabets and spaces
        message: 'Name can only contain letters and spaces.',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value), // Validate email format
        message: 'Invalid email format.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // This will create createdAt and updatedAt fields
    versionKey: false, // Suppress the __v field
  }
);

// Add auto-increment plugin
userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: 'id' });

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
