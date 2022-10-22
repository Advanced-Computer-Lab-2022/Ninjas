const mongoose = require('mongoose');
const countryEnums = require('../Enums/countryEnums')
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        min:6,
        max:100
    },
    password: {
        type: String,
        required:true,
        min:6,
        max:100
    },
    firstName: {
        type: String,
        required:true,
        min:2,
        max:100
    },
    lastName: {
        type: String,
        required:true,
        min:2,
        max:100
    },
    gender: {
        type: String,
        enum: ['MALE','FEMALE'],
        required: true
    },
    country: {
        type: String,
        enum: countryEnums
    }
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;