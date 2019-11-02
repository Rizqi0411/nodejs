var jsonResult = require('../jsonResult');
var payment = require('../../models').bill_payment;
var path = require('path');
var dateFormat = require('dateformat');

var controller = function () {}

controller.getAll = function (req, res, next) {
    payment.findAll().then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Bill_payment not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByid = function (req, res) {
    var id_payment = req.params.id_payment
    payment.findByPk(id_payment).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Loans not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.add = function (req, res, nect) {
    var account_number = req.body.account_number;
    var amount = req.body.amount;
    payment.sequelize.query('insert into daily_payment (account_number,amount,payment_date) values(?,?,current_date)',
        {replacements:[account_number,amount],
        type: payment.sequelize.QueryTypes.INSERT}).then( entity => {
        if (entity){
            res.json(jsonResult(200,'success'))
        }else {
            throw 'create failed';
        }
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.edit = function (req, res, next) {
    var data = req.params.id_payment
    payment.findOne({where: {id_payment: data}}).then(entity => {
        if (entity) {
            return entity.update(req.body)
        }else {
            throw 'Loan not Found'
        }
    }).then(entity => {
        res.json(jsonResult(200, 'success', entity))
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.delete = function (req, res, next) {
    var id_payment = req.params.id_payment
    payment.destroy({where:{id_payment : id_payment}}).then(affectedRows => {
        if (affectedRows){
            res.json(jsonResult(200, 'success'))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}
module.exports = controller;
