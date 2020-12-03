const express =  require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('hospital/addOrEdit', {
        viewTitle : "Insert Hospital"
    });
});

module.exports = router;