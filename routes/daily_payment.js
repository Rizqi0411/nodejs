var express = require('express');
var router = express.Router();
var dailyPaymentController = require('../moduls/controller/daily_payment');
var cors = require('cors');

router.use(
    cors(),
    function timelog(req, res, next) {
        console.log('Time', Date.now())
        next()
    })

router.get('/', dailyPaymentController.getAll)
router.get('/:id_payment', dailyPaymentController.findByid)
router.post('/', dailyPaymentController.add)
router.put('/:id_payment', dailyPaymentController.edit)
router.delete('/:id_payment', dailyPaymentController.delete)


module.exports = router;