var mongoose = require("mongoose");

var equipementSchema = mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { collection: "equipement" }
);

module.exports = mongoose.model("Equipement", equipementSchema);
