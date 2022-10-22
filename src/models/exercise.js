const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { questionSchema } = require('./question');

const exerciseSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    totalGrade: {
        type: Number,
        required: true
    },

})

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = { Exercise, exerciseSchema };