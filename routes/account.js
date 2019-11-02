var express = require('express');
var router = express.Router();
var account = require('../moduls/controller/account');
var cors = require('cors');

router.use(
    cors(),
    function timelog(req, res, next) {
        console.log('Time', Date.now())
        next()
    })

router.get('/', account.getAll)
router.get('/:account_number', account.findByid)
router.get('/cif/:cif', account.findByCif)
router.post('/', account.add)
router.put('/:account_number', account.edit)
router.delete('/:account_number', account.delete)


module.exports = router;