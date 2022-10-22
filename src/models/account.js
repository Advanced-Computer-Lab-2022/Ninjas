const mongoose = require('mongoose');
const countryEnums = require('../Enums/countryEnums')
const Schema = mongoose.Schema;



const accountSchema = new Schema({
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
        enum: countryEnums
    }
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;