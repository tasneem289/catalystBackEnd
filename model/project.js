const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const projectSchema = new mongoose.Schema({
    info: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    publishingTime: {
        type: Date,
      default:Date.now
    },
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`User`
    },

    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }]
})

module.exports = mongoose.model('Project', projectSchema);