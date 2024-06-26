const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { questionSchema } = require('./question');

const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitleId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    questions: {
        type: [questionSchema],
        default:[]
    },
    totalGrade: {
        type: Number,
        default: 0
    }
})

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = { Exercise, exerciseSchema };