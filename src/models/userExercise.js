const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { exerciseSchema } = require('./exercise')

const userExerciseSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    exercises: {
        type: [exerciseSchema],
        required: true
    },
    userGrade: {
        type: Number,
        required: true
    },
    gradePercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    viewedAnswers:{
        type: Boolean,
        default: false,
    }

})


const UserExercise = mongoose.model('UserExercise', userExerciseSchema);
module.exports = UserExercise;
