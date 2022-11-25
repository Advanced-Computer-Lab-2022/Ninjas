const mongoose = require('mongoose');
const { exerciseSchema } = require('./exercise');
const Schema = mongoose.Schema;
const { videoSchema } = require('./video');

const subtitleSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    videoTitles: {
        type: videoSchema
    },
    exercises: { //according to piazza, each subtitle will have its own exercise(s)
        type: [exerciseSchema],
        default: []
    }
})

const Subtitle = mongoose.model('Subtitle', subtitleSchema);
module.exports = {
    Subtitle,
    subtitleSchema
}
