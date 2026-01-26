const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  appointmentId: mongoose.Schema.Types.ObjectId,
  diagnosis: String,
  notes: String,
  date: Date,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
    },
    specialization: String,
    medicalHistory: [medicalHistorySchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
