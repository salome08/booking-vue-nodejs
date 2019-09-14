const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    equipements: { type: Array },
    reservations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }
    ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
  },
  { collection: "room" }
);

module.exports = mongoose.model("Room", roomSchema);
