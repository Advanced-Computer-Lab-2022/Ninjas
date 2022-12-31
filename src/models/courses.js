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
        default: []

    },
    subtitles: {
        type: [subtitleSchema],
        default: []

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
        type: Date,
        required: false
    },
    videoLink:{
        type:String,
        required:true
    },
    students: {
        type: [Schema.Types.ObjectId],
        required: false

    },
    certificate: {
        type: String,
        default: 'generalCertificate.pdf'
    },
    promoted: {
        type: String,
        enum: ['Promoted', 'Not Promoted'],
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
countryPriceDetails.set('United States', {
    factor: 1,
    discount: 10,
    currency: 'USD'
})
const Course = mongoose.model('Course', coursesSchema);
module.exports = { Course, countryPriceDetails };