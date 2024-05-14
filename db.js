const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tasneemw234:1XFfElLgzJEG1Xtt@last.qllcyxp.mongodb.net/Catalyst?retryWrites=true&w=majority&appName=Last')
.then(()=>{
    console.log("connected to DB");
})
.catch(()=>{
    console.log("error");
})

