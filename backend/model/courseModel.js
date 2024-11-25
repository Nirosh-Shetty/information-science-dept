import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCode: { type: String, required: true },
  className: { type: [String], required: true },
});

export default mongoose.model("Course", courseSchema);
