const mongoose=require('mongoose');


var hospitalSchema = new mongoose.Schema({
    fullName : {
        type : String,
    },

    email : {
        type : String
    },

    city : {
        type : String,
    },
});

mongoose.model('Hospital', hospitalSchema);