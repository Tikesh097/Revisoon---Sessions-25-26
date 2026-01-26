const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
    },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    closedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ticket", ticketSchema);
