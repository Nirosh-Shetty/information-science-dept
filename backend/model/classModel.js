import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "4rd Year ISE B Sec"
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
22;

export default mongoose.model("Class", classSchema);
