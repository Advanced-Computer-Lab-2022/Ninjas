const mongoose = require('mongoose');
const countryEnums= require('../Enums/countryEnums');
const Schema = mongoose.Schema;
const instructorToCoursesSchema = new Schema({
    accountSchema: {
        type: [ {
                username: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required:true
                },
                firstName: {
                    type: String,
                    required:true
                },
                lastName: {
                    type: String,
                    required:true
                },
                gender: {
                    type: String,
                    enum: ['MALE','FEMALE'],
                    required: true
                },
                country: {
                    type: String,
                    enum: countryEnums,
                    required: true
                }
            } ],
        required: true
    },
    courseIds:{
        type:[Schema.Types.ObjectId],
        required: true
    }
   
})

const InstructorToCourses = mongoose.model('InstructorToCourses', instructorToCoursesSchema);
module.exports = InstructorToCourses;