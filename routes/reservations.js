const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const Post = require("../models/post");

//ALL RESERVATIONS
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

//SPECIFIC RESERVATION
router.get("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

//SUBMIT RESERVATION
router.post("/", async (req, res) => {
  const reservation = new Reservation({
    reservationDate: req.body.reservationDate,
    reservationStartTime: req.body.reservationStartTime,
    reservationEndTime: req.body.reservationEndTime,
    nbrPersons: req.body.nbrPersons
  });
  try {
    const savedReservation = await reservation.save();
    res.json(savedReservation);
    console.log("saved");
  } catch (e) {
    res.json({ msg: e });
  }
});

//DELETE RESERVATION
router.delete("/:reservationId", async (req, res) => {
  try {
    const removedPost = await Reservation.deleteOne({
      _id: req.params.reservationId
    });
    res.json(removedPost);
  } catch (e) {
    res.json({ msg: e });
  }
});

module.exports = router;
