import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: {type:String, required:true},
  avatar:{type:String},
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String, default: "admin" }, // Useful for authorization checks
});

export default mongoose.model("Admin", adminSchema);
