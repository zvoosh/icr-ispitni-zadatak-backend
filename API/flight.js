var express = require("express");
const Flight = require("../models/flightModel");
var fs = require("fs");
var multer = require("multer");
const mongoose = require("mongoose");

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
        _someId: new mongoose.Types.ObjectId,
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
        total: req.body.total,
        comments: req.body.comments,
        wroteComment: req.body.wroteComment
    });
    flight.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(`${err} : PostOneFlight`);
    });
})

router.put('/flight/:id', upload.single('productImage'), async (req, res) => {
    Flight.findById(req.params.id).then(async (result) => {
        result._someId = new mongoose.Types.ObjectId;
        result.title = req.body.title;
        result.starting = req.body.starting;
        result.destination = req.body.destination;
        result.description = req.body.description;
        result.image = date_now + req.file.originalname;
        result.class = req.body.class;
        result.price = req.body.price;
        result.takeoffDate = req.body.takeoffDate;
        result.landingDate = req.body.landingDate;
        result.takesoff = req.body.takesoff;
        result.lands = req.body.lands;
        result.status = req.body.status;
        result.filled = req.body.filled;
        result.total = req.body.total;
        result.comments = result.comments;
        result.wroteComment = result.wroteComment;
        await result.save();
        res.send('success');
    }).catch((err) => {
        console.log(`${err} : EditOneFlight `);
    });
})
router.put('/flight/comments/:id', async (req, res) => {
    console.log(req.body)
    await Flight.findById(req.params.id).then(async (result) => {
        var commentsArr = [...result.comments, req.body.comments];
        var ratingArr = [...result.rating, req.body.rating];
        var wroteArr = [...result.wroteComment, req.body.wroteComment];
        result.comments = commentsArr;
        result.rating = ratingArr;
        result.wroteComment = wroteArr
        await result.save();
        res.status(200);
        res.send('Success');
    }).catch((err) => {
        console.log(`${err} : CommentOneFlight `);
    });
})

router.put('/flight/reserve/:id', async (req, res) => {
    await Flight.findById(req.params.id).then(async (result) => {
        var clients = [];
        for (let i = 0; i < req.body.count; i++) {
            clients.push(req.body.client_id);
        }
        var arrForSend = [...result.filled, ...clients]
        result.filled = arrForSend;
        await result.save();
        res.status(200);
        res.send('Success');
    }).catch((err) => {
        console.log(`${err} : ReserveOneFlight `);
    });
})

router.put('/flight/unreserve/:id', async (req, res) => {
    await Flight.findById(req.params.id).then(async (result) => {
        filledArr = result.filled.filter((i) => {
            i !== req.body.client_id;
        })
        result.filled = filledArr;
        await result.save();
        res.status(200);
        res.send('Success');
    }).catch((err) => {
        console.log(`${err} : UnreserveOneFlight `);
    });
})

router.delete('/flight/:id', (req, res) => {
    Flight.findByIdAndDelete(req.params.id).then((result) => {
        res.send("success");
    }).catch((err) => {
        console.log(`${err} : DeleteOneFlight`)
    })
})

module.exports = router;