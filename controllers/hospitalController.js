const express =  require('express');
const mongoose = require('mongoose');

//const Hospital = mongoose.model('Hospital');
const Hospital = require('../models/hospital.model');


var router = express.Router();


router.get('/', (req, res) => {
    res.render('hospital/addOrEdit', {
        viewTitle : "Insert Hospital"
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var hospital = new Hospital();

    hospital.fullName = req.body.fullName;
    hospital.email = req.body.email;
    hospital.city = req.body.city;

    hospital.save((err,doc) => {
        if(!err)
            res.redirect('hospital/list');
        else {
            console.log('Error during record insertion : ' + err);
        }
    });

}

router.get('/list', (req, res) => {
    res.json('from list');
});

module.exports = router;