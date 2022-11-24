const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    firstName: {
        type: String,
        min: 2,
        max: 100
    },
    lastName: {
        type: String,
        min: 2,
        max: 100
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    text: {
        type: String,
        default: null
    }

});
const Rating = mongoose.model('Rating', ratingSchema);
module.exports = { Rating, ratingSchema };