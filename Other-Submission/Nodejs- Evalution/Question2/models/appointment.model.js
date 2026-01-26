const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    appointmentDate: Date,
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    symptoms: String,
    prescription: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
