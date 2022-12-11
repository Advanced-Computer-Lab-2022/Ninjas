const mongoose = require('mongoose');
const countryEnums = require('../Enums/countryEnums')
const { ratingSchema } = require('./rating')
const { reportSchema } = require('./report')
const {coursesSchema}=require ('./courses')
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    firstName: {
        type: String,
        min: 2,
        max: 100
    },
    lastName: {
        type: String,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],

    },
    country: {
        type: String,
        enum: countryEnums,
        default: 'United States',
    },
    type: {
        type: String,
        enum: ['INSTRUCTOR', 'ADMIN', 'GUEST', 'CORPORATE_TRAINEE', 'INDIVIDUAL_TRAINEE',],
        required: true
    },
    biography:{
        type: String,
        
    },
    review:{
        type:[ratingSchema],
        default:[]
},
    rating:{
    type:Number,
    min:0,
    max:5,
    default:0
},

contractStatus:{ //for instructor
    type: Boolean,
    default: false
  //  required: true
},

certificates: {
    type: [String],
    default: []
},
progress: [
    {
        courseId: Schema.Types.ObjectId,
        currentProgress: Number,
    }
],


reports: {
    type: [reportSchema],
    default: [],
companyPolicy: { 
    type: Boolean,
    default: false
},
wallet:{
    type:Number,
    deafult:0
}


},


refundedCourses:{
    type:[coursesSchema],
    required: false
},


})

const Account = mongoose.model('Account', accountSchema);
module.exports = { Account, accountSchema };