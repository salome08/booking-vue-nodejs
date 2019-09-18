const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const Room = require("../models/room");

//ALL RESERVATIONS
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("roomId");
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
    reservationDate: req.body.params.reservationDate,
    reservationStartTime: req.body.params.reservationStartTime,
    reservationEndTime: req.body.params.reservationEndTime,
    nbrPersons: req.body.params.nbrPersons,
    roomId: req.body.params.roomId
  });
  try {
    const savedReservation = await reservation.save();
    //add reservation to room
    Room.findById(req.body.params.roomId).then(foundRoom => {
      foundRoom.reservations.push(savedReservation);
      foundRoom.save(error => {
        if (error) console.log(error);
      });
    });
    // Room.findById(req.body.params.roomId).then(foundRoom => {
    // });
    res.json(savedReservation);
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

//DELETE RESERVATION
router.delete("/:reservationId", async (req, res) => {
  try {
    const removedReservation = await Reservation.deleteOne({
      _id: req.params.reservationId
    });
    res.json(removedReservation);
  } catch (e) {
    res.json({ msg: e });
  }
});

module.exports = router;
