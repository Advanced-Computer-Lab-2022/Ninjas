// {
//     questionText, //type: string. required
//     MCQs, //array of type string, required
//     userAnswer, //string, default:null
//     correctAnswer, //string, required
//     totalCredit //number, required
//     }
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    mcqs: {
        type: Array,
        required:true
    },
    userAnswer: {
        type: String,
        deafult:null,
        required:false
    },
    correctAnswer: {
        type: String,
        required:true
    },
    totalCredit: {
        type: Number,
        required: true
    }
})

const question = mongoose.model('question', questionSchema);
module.exports = question;


