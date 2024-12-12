import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  dob: { type: Date },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  email: { type: String },
  className: { type: String },
  role: { type: String, default: "student" },
  avatar: { type: String },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      internalMarks: [{ internalNumber: Number, marks: Number }],
    },
  ],
});

export default mongoose.model("Student", studentSchema);
