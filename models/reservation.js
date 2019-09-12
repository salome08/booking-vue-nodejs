const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    reservationDate: { type: Date, required: true },
    reservationStartTime: { type: Date, required: true },
    reservationEndTime: { type: Date, required: true },
    nbrPersons: { type: Number, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
      // required: true
    }
  },
  { collection: "reservation" }
);

module.exports = mongoose.model("Reservation", reservationSchema);
