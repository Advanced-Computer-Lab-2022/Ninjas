const mongoose = require('mongoose');
const countryEnums = require('../Enums/countryEnums');
const { accountSchema } = require('./account');
const { ratingSchema } = require('./rating');
const Schema = mongoose.Schema;
const instructorToCoursesSchema = new Schema({
  account: {
    type: [accountSchema],
  },
  courseIds: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  rating: {
    type : [ratingSchema]
  },
  generalRating : {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  }
})


const InstructorToCourses = mongoose.model('InstructorToCourses', instructorToCoursesSchema);
module.exports = InstructorToCourses;