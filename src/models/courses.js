const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { accountSchema } = require('./account');
const { subtitleSchema } = require('./subtitle');

const coursesSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    price: {
        type: Number,
        required:true
    },
    totalHours: {
        type: Number,
        required:true
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
        type: [accountSchema]
        
    },
    subtitles: {
       type: [subtitleSchema]
    }
})

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;