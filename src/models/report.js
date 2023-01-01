const mongoose = require('mongoose');
const { accountSchema } = require('./account')
const { coursesSchema } = require('./courses')
const Schema = mongoose.Schema;



const reportSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    problem:{
        type:String,
        enum: ['technical', 'financial', 'other'],
        required: true
        
    },
    description:{
        type:String,
        //enum: ['technical', 'financial', 'other'],
        //required: true
        
    },
    progress:  {
        type:String,
        enum: ['RESOLVED', 'PENDING','INITIAL'],
        default:'PENDING',
        required: true
       

    },

    seen:{
        type:Boolean,
        default:false,
    },

    instructorId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    followUp:{
        type : Boolean,
        default:false,

    }

})

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;