import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, required: true },
  avatar : {type: String},
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  designation: { type: String, default: "Not Assigned" },
  role: { type: String, default: "staff" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  password: { type: String, required: true },
  assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
});

export default mongoose.model("Staff", staffSchema);
