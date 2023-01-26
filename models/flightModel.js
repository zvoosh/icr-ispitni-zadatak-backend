const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    starting: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    takeoffDate: {
        type: String,
        required: true
    },
    landingDate: {
        type: String,
        required: true
    },
    takesoff: {
        type: String,
        required: true,
    },
    lands: {
        type: String,
        required: true
    },
    rating: {
        type: [Number],
        required: false,
    },
    status: {
        type: String,
        enum: ['predstojeci', 'obavljen', 'otkazan'],
        required: true,
    },
    filled: {
        type: [String],
        default: [],
        required: false,
    },
    total: {
        type: Number,
        required: true,
    },
    comments: {
        type: [String],
        default: [],
        required: false,
    },
    wroteComment: {
        type: [String],
        default: [],
        required: false,
    }
});

const Flight = mongoose.model("flight", flightSchema);

module.exports = Flight;
