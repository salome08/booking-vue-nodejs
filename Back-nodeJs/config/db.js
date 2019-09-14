const mongoose = require("mongoose");
const url =
  "mongodb+srv://salome:mongostationf@cluster0-mlsc9.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, function(err, result) {
  if (err) {
    return "Oops: " + err;
  }
  console.log("Database connection :) ");
});
