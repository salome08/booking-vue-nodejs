const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Equipment = require("../models/equipement");

/*
    Si la tv est cochee, je recois tv sinon undefined
    si tv je recupere ou name=tv sinon tout 

    equipement.name exist && equipement.name = tv

    soit les salles ou il y a la tv 
    soit celles ou il y a un rp 
    soit toutes

*/
//ALL ROOMS
router.get("/", async (req, res) => {
  let nbrParticipants = req.query.participants;
  let tv = req.query.tv;
  let rp = req.query.rp;
  let bothEq = tv && rp ? true : false;
  Room.find({ capacity: { $gte: nbrParticipants || 0 } })
    .populate("equipements")
    .populate("reservations")
    .then(rooms => {
      if (tv || rp) {
        const filteredEquipmentsRooms = rooms.filter(room =>
          bothEq
            ? room.equipements.length > 1
            : room.equipements.some(el => el.name == tv || el.name == rp) ==
              true
        );
        res.json(filteredEquipmentsRooms);
      } else res.json(rooms);
    })
    .catch(e => {
      res.status(400).json({ msg: e });
    });
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
    updatedAt: req.body.updatedAt,
    equipements: req.body.equipements
  });
  // req.body.equipements.forEach(element => {
  //   room.equipements.push(element);
  // });
  try {
    const savedRoom = await room.save();
    res.json(savedRoom);
    console.log("saved");
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
    console.log(insertedEquipment);
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
