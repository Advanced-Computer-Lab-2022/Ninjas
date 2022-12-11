const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { accountSchema } = require('./account');
const { exerciseSchema } = require('./exercise');
const { ratingSchema } = require('./rating');
const { subtitleSchema } = require('./subtitle');
const { videoSchema } = require('./video');

const coursesSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    instructors: {
        type: [accountSchema],
        required: true

    },
    subtitles: {
        type: [subtitleSchema]
    },
    exercises: {
        type: [exerciseSchema]
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    reviews: {
        type: [ratingSchema],
        default: []
    },
    
    discountDuration:{
        type: Number,
        default:0,
        min: 1
    },
    videoLink:{
        type:String,
        required:true
    },
    students: {
        type: [accountSchema],
        required: false

    }
   

})

const countryPriceDetails = new Map();
countryPriceDetails.set('Egypt', {
    factor: 20,
    discount: 10,
    currency: 'EGP'
})
countryPriceDetails.set('France', {
    factor: 5,
    discount: 5,
    currency: 'EUR'
})

const Course = mongoose.model('Course', coursesSchema);
module.exports = { Course, countryPriceDetails };