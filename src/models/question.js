const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },
    mcqs: {
        type: [String],
        required: true,
        validate: {
            validator(value) {
              return value.length == 4;
            },
            message: 'there has to be exactly 4 choices',
          },
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
module.exports = {question, questionSchema};


