const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const courseRatingSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

})

const CourseRating = mongoose.model('CourseRating', courseRatingSchema);
module.exports = CourseRating;