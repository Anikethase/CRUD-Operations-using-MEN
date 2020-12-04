const express =  require('express');
const mongoose = require('mongoose');

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
            if(err.name == 'ValidationError') {
                handleValidationError(err,req.body);
                res.render('hospital/addOrEdit', {
                    viewTitle : "Insert Hospital Data",
                    hospital : req.body
                });
            }
            else {
                console.log('Error during record insertion : ' + err);
            }
        }
    });

}

router.get('/list', (req, res) => {
    Hospital.find((err, docs) => {
        if(!err){
            res.render('hospital/list', {
                list : docs
            });
        }
        else {
            console.log('Error in retrieving employee list : ' + err);
        }
    })
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path) {
            case 'fullName': 
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email': 
                body['emailError'] = err.errors[field].message;
                break;

            default :
                break;
        }
    }
}

module.exports = router;