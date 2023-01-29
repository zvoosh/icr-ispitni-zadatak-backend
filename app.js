//init da napravis json fajl za depedencije
//npm install cors body-parser express nodemon mongoose
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var port = process.env.PORT || 5050;

//connect to mongodb
const db =
  "mongodb+srv://dusan:dusan@nodeside.dq5qytk.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log('Running')
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
//Cross-origin resource sharing, enables to be requested from another domain outside the domain from which the first resource was served.
app.use(cors());
// http://localhost:3000/api/flight/flight
var flight = require("./API/flight");
app.use("/api/flight", flight);
var client = require("./API/client");
app.use("/api/client", client);

app.use(bodyParser.json());
app.use(cors());
