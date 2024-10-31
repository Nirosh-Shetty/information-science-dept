import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  phoneNumber: { type: String },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  role: { type: String, default: "student" },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      internalMarks: [{ internalNumber: Number, marks: Number }],
    },
  ],
});

export default mongoose.model("Student", studentSchema);
