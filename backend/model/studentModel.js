const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  usn: { type: String, unique: true, required: true }, // University Seat Number
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  currentSem: { type: Number, min: 1, max: 8, required: true },
  department: { type: String, required: true }, // E.g., 'ISE'
  phoneNumber: { type: String, required: true },
  subjects: [
    {
      subjectName: String,
      internals: [
        {
          internalNumber: { type: Number, enum: [1, 2, 3] }, // Internal 1, 2, or 3
          marks: { type: Number, min: 0, max: 100 },
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
