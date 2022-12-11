const mongoose = require('mongoose');
const { accountSchema } = require('./account')
const { coursesSchema } = require('./courses')
const Schema = mongoose.Schema;


const refundRequestSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },



})

const RefundRequest = mongoose.model('Refund', refundRequestSchema);
module.exports = RefundRequest;