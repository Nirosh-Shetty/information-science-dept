import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: { type: Date, required: true },
  session: {
    type: String,
    required: true,
  },
  attendance: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      attendance: {
        type: String,
        enum: ["Present", "Absent", "Excused"],
        required: true,
      },
    },
  ],
});

export default mongoose.model("Attendance", attendanceSchema);
