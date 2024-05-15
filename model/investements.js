const mongoose = require('mongoose');
const investSchema =new mongoose.Schema({ 
    amount: { 
        type: Number,
        required:true
    },
    project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },    
        
});

module.exports = mongoose.model('Investment', investSchema);
