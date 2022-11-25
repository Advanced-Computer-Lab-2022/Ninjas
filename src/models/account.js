const mongoose = require('mongoose');
const countryEnums = require('../Enums/countryEnums')
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
        deafult:[]
},
    rating:{
    type:Number,
    min:0,
    max:5,
    deafult:0
},

})

const Account = mongoose.model('Account', accountSchema);
module.exports = { Account, accountSchema };