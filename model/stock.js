const mongoose = require('mongoose');
const stockSchema =new mongoose.Schema({ 
    amount: { 
        type: Number,
        required:true
    },
    projects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],

});

module.exports = mongoose.model('Stock', stockSchema);
