import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  quizId: {
    type: String, // Unique ID for each quiz
    required: true,
    unique: true,
  },
  title: {
    type: String, // Title of the quiz
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class", // Assuming this is the class model
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff", // Assuming this is the staff model
    required: true,
  },
  isAvailable: {
    type:Boolean,
    default:false
  },
}, { timestamps: true });

export default mongoose.model("Question", QuestionSchema);
