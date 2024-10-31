import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mathematics"
  code: { type: String, required: true, unique: true }, // e.g., "MATH101"
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
});

export default mongoose.model("Course", courseSchema);
