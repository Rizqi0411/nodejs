var express = require('express');
var router = express.Router();
var paymentController = require('../moduls/controller/bill_payment');
var cors = require('cors');

router.use(
    cors(),
    function timelog(req, res, next) {
        console.log('Time', Date.now())
        next()
    })

router.get('/', paymentController.getAll)
router.get('/:id_payment', paymentController.findByid)
router.post('/', paymentController.add)
router.put('/:id_payment', paymentController.edit)
router.delete('/:id_payment', paymentController.delete)


module.exports = router;