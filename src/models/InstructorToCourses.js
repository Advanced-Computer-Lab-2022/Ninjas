const mongoose = require('mongoose');
const countryEnums= require('../Enums/countryEnums');
const { accountSchema } = require('./account');
const Schema = mongoose.Schema;
const instructorToCoursesSchema = new Schema({
  account: {
        type: [accountSchema],
  },
    courseIds:{
        type:[Schema.Types.ObjectId],
        required: true
    }
})

const InstructorToCourses = mongoose.model('InstructorToCourses', instructorToCoursesSchema);
module.exports = InstructorToCourses;