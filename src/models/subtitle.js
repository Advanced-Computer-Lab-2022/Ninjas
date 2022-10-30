const mongoose = require('mongoose');
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
    }
})

const Subtitle = mongoose.model('Subtitle', subtitleSchema);
module.exports = {
    Subtitle,
    subtitleSchema
}
