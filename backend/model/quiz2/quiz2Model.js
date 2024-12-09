import mongoose from "mongoose";

// Define the schema for a single question
const QuestionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length === 4; // Ensure exactly 4 options
      },
      message: 'There must be exactly 4 options.',
    },
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return this.options.includes(v); // Ensure the correct answer is one of the options
      },
      message: 'The correct answer must be one of the options.',
    },
  },
});

// Add a virtual `questionId` field to expose `_id` as `questionId`
QuestionSchema.virtual('questionId').get(function () {
  return this._id.toString(); // Convert ObjectId to a string
});

// Ensure virtuals are included in JSON responses
QuestionSchema.set('toJSON', { virtuals: true });

// Define the schema for the quiz
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Class model (if any)
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff', // Reference to the Staff model (if any)
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure there's at least one question
      },
      message: 'A quiz must have at least one question.',
    },
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true, // Optional, depending on your requirements
    validate: {
      validator: function (v) {
        return v > Date.now(); // Ensure the due date is in the future
      },
      message: 'Due date must be in the future.',
    },
  },
  time: {
    type: Number, // Time allotted for the quiz in minutes
    required: true,
  },
  random : {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the `updatedAt` field on save
QuizSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
export default mongoose.model('Quiz', QuizSchema);
