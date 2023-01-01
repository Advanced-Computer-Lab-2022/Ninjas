const mongoose = require('mongoose');
const { accountSchema } = require('./account')
const { coursesSchema } = require('./courses')
const Schema = mongoose.Schema;


const requestAccessSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    corporateName:{
        type: String,
        //required true
    }



})

const RequestAccess = mongoose.model('Request', requestAccessSchema);
module.exports = RequestAccess ;
