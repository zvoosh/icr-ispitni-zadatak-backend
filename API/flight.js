var express = require("express");
const Flight = require("../models/flightModel");
var fs = require("fs");
var multer = require("multer");

var router = express.Router();
var date_now = Date.now();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../icr-ispitni-projekat-ts/public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, date_now + file.originalname);
    },
});

var fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/flight', (req, res) => {
    if (Object.keys(req.query)[0] !== '{}') {
        Flight.find(req.query).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(`${err} : GetAllFlights `);
        })
        return;
    }
    Flight.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(`${err} : GetAllFlights `);
    })

});

router.get('/flight/:id', (req, res) => {
    Flight.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(`${err} : GetOneFlight `);
    });
})

router.post('/flight', upload.single('productImage'), (req, res) => {
    const flight = new Flight({
        title: req.body.title,
        starting: req.body.starting,
        destination: req.body.destination,
        description: req.body.description,
        image: date_now + req.file.originalname,
        class: req.body.class,
        price: req.body.price,
        takeoffDate: req.body.takeoffDate,
        landingDate: req.body.landingDate,
        takesoff: req.body.takesoff,
        lands: req.body.lands,
        rating: req.body.rating,
        status: req.body.status,
        filled: req.body.filled,
        total: req.body.total
    });
    flight.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(`${err} : PostOneFlight`);
    });
})

router.put('/flight/:id', async (req, res) => {
    await Flight.findOneAndUpdate(req.params.id, { $set: req.body })
    res.send('Success')
})

router.put('/flight/reserve/:id', async (req, res) => {
    var flight = await Flight.findById(req.params.id);
    var clients = [];
    for(let i = 0; i < req.body.count; i++){
        clients.push(req.body.client_id);
    }
    var arrForSend =  [...flight.filled, ...clients]
    var objForSend = {
        filled: arrForSend
    }
    await Flight.findOneAndUpdate(req.params.id, objForSend)
    res.status(200);
    res.send('Success');
})

router.put('/flight/unreserve/:id', async (req, res) => {
    var flight = await Flight.findById(req.params.id);
    filledArr = flight.filled.filter((i)=>{
        i !== req.body.client_id;
    })
    await Flight.findOneAndUpdate(req.params.id, {filled: filledArr})
    res.status(200);
    res.send('Success');
})

router.delete('/flight/:id', (req, res) => {
    Flight.findByIdAndDelete(req.params.id).then((result) => {
        res.send("success");
    }).catch((err) => {
        console.log(`${err} : DeleteOneFlight`)
    })
})

module.exports = router;