const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Equipement = require("../models/equipement");

//ALL ROOMS
router.get("/", async (req, res) => {
  try {
    // console.log(req.query.participants);
    const rooms = await Room.find();
    res.json(rooms);
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

//SPECIFIC ROOM
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.json(room);
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

//CREATE ROOM
router.post("/", async (req, res) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  });
  req.body.equipements.forEach(element => {
    room.equipements.push(element);
  });
  try {
    const savedRoom = await room.save();
    res.json(savedRoom);
    console.log("saved");
  } catch (e) {
    res.json({ msg: e });
  }
});

//DELETE ROOM
router.delete("/:roomId", async (req, res) => {
  try {
    const removedRoom = await Room.deleteOne({
      _id: req.params.roomId
    });
    res.json(removedRoom);
  } catch (e) {
    res.json({ msg: e });
  }
});

//CREATE EQUIPEMENT
router.post("/equipement", async (req, res) => {
  const equipement = new Equipement({
    name: req.body.name
  });
  try {
    const savedEquipement = await equipement.save();
    res.json(savedEquipement);
    console.log("saved");
  } catch (e) {
    res.json({ msg: e });
  }
});

//ALL EQUIPEMENT
router.get("/equipement", async (req, res) => {
  try {
    const equipements = await Equipement.find({ name: "TV" });
    res.json(equipements);
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

module.exports = router;
