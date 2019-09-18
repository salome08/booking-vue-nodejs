const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Equipment = require("../models/equipement");

//ALL ROOMS
router.get("/", async (req, res) => {
  const nbrParticipants = req.query.participants;
  const tv = req.query.tv;
  const rp = req.query.rp;
  const bothEq = tv && rp ? true : false;
  let availablesRooms = [];
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);

  Room.find({ capacity: { $gte: nbrParticipants || 0 } })
    .populate("equipements")
    .populate("reservations")
    .then(rooms => {
      rooms.forEach(room => {
        let isReserved = false;
        room.reservations.forEach(reservation => {
          const existingStartTime = new Date(reservation.reservationStartTime);
          const existingEndTime = new Date(reservation.reservationEndTime);

          endTime <= existingStartTime || startTime >= existingEndTime
            ? (isReserved = false)
            : (isReserved = true);
        });
        if (isReserved == false) {
          availablesRooms.push(room);
        }
      });

      if (tv || rp) {
        availablesRooms = availablesRooms.filter(room =>
          bothEq
            ? room.equipements.length > 1
            : room.equipements.some(el => el.name == tv || el.name == rp) ==
              true
        );
      }
      res.json(availablesRooms);
    })
    .catch(e => {
      res.status(400).json({ msg: e });
    });
});

//CREATE ROOM
router.post("/", async (req, res) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    equipements: req.body.equipements
  });
  try {
    const savedRoom = await room.save();
    res.json(savedRoom);
  } catch (e) {
    res.json({ msg: e });
  }
});

//ADD EQUIPMENT
router.post("/addEquipment", function(req, res, next) {
  var equipment = new Equipment({
    name: req.body.name
  });
  equipment.save(function(err, insertedEquipment) {
    if (err) {
      res.send(err);
    }
    res.json(insertedEquipment);
  });
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
  } catch (e) {
    res.json({ msg: e });
  }
});

module.exports = router;
