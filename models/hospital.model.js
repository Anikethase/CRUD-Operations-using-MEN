const mongoose=require('mongoose'),
    path = require('path');

const hospitalSchema = mongoose.Schema({
    fullName : {
        type : String,
        require : "The Name is Required.",
    },

    email : {
        type : String
    },

    city : {
        type : String,
    },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
