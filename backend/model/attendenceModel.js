const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  date: { type: Date, required: true },
  attendance: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      present: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
