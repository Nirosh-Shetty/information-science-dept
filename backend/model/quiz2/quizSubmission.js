import mongoose from "mongoose";

// Define the schema for a single quiz attempt
const QuizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', // Reference to the Quiz model
    required: true,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
  answers: {
    type: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
    required: true, // Array of answers (questionId and the selected answer)
  },
  score: {
    type: Number,
    default: 0, // Score can be calculated based on answers
  },
  isCompleted: {
    type: Boolean,
    default: false, // Flag to check if the student has completed the quiz
  },
});

// Define the QuizSubmission schema
const QuizSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Student model
    ref: 'Student', // Reference to the Student model
    required: true, 
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Reference to the Course model
    },
  ],
  quizAttempts: {
    type: [QuizAttemptSchema], // Array of quiz attempts
    default: [],
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
QuizSubmissionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
export default mongoose.model('QuizSubmission', QuizSubmissionSchema);
