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
    if(req.body._id == '')
        insertRecord(req, res);
    else 
        updateRecord(req, res);
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
function updateRecord(req, res) {
    Hospital.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err,doc) => {
        if(!err)
           res.redirect('hospital/list');
        else {
            if(err.name == 'ValidationError') {
                handleValidationError(err,req.body);
                res.render('hospital/addOrEdit', {
                    viewTitle : "Update Hospital Data",
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

router.get('/:hospital_id', (req, res) => {
    Hospital.findById(req.params.hospital_id, (err, doc) => {
        if(!err) {
            res.render('hospital/addOrEdit', {
                viewTitle : "Update Hospital Data",
                hospital : doc
            });
        }
    });
});

router.get('/delete/:hospital_id', (req, res) => {
    Hospital.findByIdAndRemove(req.params.hospital_id, (err, doc) => {
        if(!err)
           res.redirect('/hospital/list');
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
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