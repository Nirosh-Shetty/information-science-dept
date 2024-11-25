import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    classes: {
        className: { type: String },
        subName: { type: String },
    },
});

export default mongoose.model("Assignment", assignmentSchema);