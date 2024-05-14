const mongoose = require('mongoose');
const stockSchema =new mongoose.Schema({ 
    amount: { 
        type: Number,
        required:true
    },
    price: { 
        type: Number,
        required:true,
    },

});

module.exports = mongoose.model('Stock', stockSchema);