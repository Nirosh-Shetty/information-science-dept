import mongoose from "mongoose";
const staffSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  phone: String,
  department: String,
  designation: String,
  coursesTaught: [ObjectId],
  createdAt: Date,
  updatedAt: Date,
});

const staffModel = new mongoose.model("staffModel", staffSchema);
export default staffModel;
