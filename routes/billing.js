var express = require('express');
var router = express.Router();
var billController = require('../moduls/controller/billing');
var cors = require('cors');

router.use(
    cors(),
    function timelog(req, res, next) {
        console.log('Time', Date.now())
        next()
    })

router.get('/', billController.getAll)
router.get('/:billing_id', billController.findByid)
router.get('/loan-number/:loan_number', billController.findByLoanId)
router.post('/', billController.add)
router.put('/:billing_id', billController.edit)
router.delete('/:billing_id', billController.delete)


module.exports = router;