const mongoose=require('mongoose'),
    path = require('path');

const hospitalSchema = mongoose.Schema({
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

module.exports = mongoose.model('Hospital', hospitalSchema);

//mongoose.model('Hospital', hospitalSchema);