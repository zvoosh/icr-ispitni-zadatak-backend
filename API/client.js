var express = require("express");
const Client = require("../models/clientModel");

var router = express.Router();

router.get("/client", (req, res) => {
  Client.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllClient`);
    });
});

router.get("/client/:id", (req, res) => {
  Client.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetOneClient`);
    });
});

router.post("/client", (req, res) => {
  const client = new Client({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    favoritePlace: req.body.favoritePlace,
    phone: req.body.phone
  });
  client.save().then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(`${err} : PostClient`)
  })
});

router.post("/admin-client", (req, res) => {
  const client = new Client({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favoritePlace: req.body.favoritePlace,
    isAdmin: req.body.isAdmin
  });
  client.save().then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(`${err} : PostClient`)
  })
});

router.put("/client/:id", async (req, res) => {
  Client.findById(req.params.id)
    .then(async (result) => {
      result.username = req.body.username;
      result.password = req.body.password;
      result.name = req.body.name;
      result.email = req.body.email;
      result.phone = req.body.phone;
      result.favoritePlace = req.body.favoritePlace;
      result.isAdmin = req.body.isAdmin;
      await result.save();
      res.send('success')
    })
    .catch((err) => {
      console.log(`${err} : EditOneClient`);
    });
});

router.delete("/delete-client/:id", (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send("success");
    })
    .catch((err) => {
      console.log(`${err} : DeleteOneClient`);
    });
});

module.exports = router;
