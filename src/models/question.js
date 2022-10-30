const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    mcqs: {
        type: Array,
        required: true
    },
    userAnswer: {
        type: String,
        default: null,
        required: false
    },
    correctAnswer: {
        type: String,
        required: true
    },
    totalCredit: {
        type: Number,
        required: true
    }
})

const question = mongoose.model('question', questionSchema);
module.exports = question;


