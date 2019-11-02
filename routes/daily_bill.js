var express = require('express');
var router = express.Router();
var dailyBillController = require('../moduls/controller/daily_bill');
var cors = require('cors');
var cron = require('node-cron');

router.use(
    cors(),
    function timelog(req, res, next) {
        console.log('Time', Date.now())
        next()
    })

router.get('/', dailyBillController.getAll)
router.get('/:id_bill', dailyBillController.findByid)
router.put('/update',dailyBillController.editAll)
router.post('/', dailyBillController.add)
router.put('/:id_bill', dailyBillController.edit)
router.delete('/:id_bill', dailyBillController.delete)


module.exports = router;