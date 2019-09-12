const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
//Middlewares
// app.use("/", () => {
//   console.log("this is the middleware");
// });

const reservationsRouter = require("./routes/reservations");

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/reservations", reservationsRouter);

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    console.log(error ? error : "Connected to db !");
  }
);

app.listen(app.get("port"), () => {
  console.log("Magic happen on port", app.get("port"));
});
