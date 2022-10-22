const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtitleSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    }
})

const Subtitle = mongoose.model('Subtitle', subtitleSchema);
module.exports = {
    Subtitle,
    subtitleSchema
}
