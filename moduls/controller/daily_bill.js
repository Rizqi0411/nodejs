var jsonResult = require('../jsonResult');
var dailyBill = require('../../models').daily_bill;
var path = require('path');
var dateFormat = require('dateformat');
const cron = require('node-cron');
const fetch = require('node-fetch');

var controller = function () {}

controller.getAll = function (req, res, next) {
    dailyBill.findAll().then(entity => {
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
    var id_bill = req.params.id_bill;
    dailyBill.findByPk(id_bill).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Loans not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.add = function (req, res, next) {
    var data = req.body
    console.log(data)
    dailyBill.create(data).then( entity => {
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
    var data = req.params.id_bill;
    dailyBill.findOne({where: {id_bill: data}}).then(entity => {
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
    var id_bill = req.params.id_bill
    dailyBill.destroy({where:{id_bill : id_bill}}).then(affectedRows => {
        if (affectedRows){
            res.json(jsonResult(200, 'success'))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.editAll = function (req, res, next) {
    var data = req.body
    dailyBill.sequelize.query('update daily_bill amount = amount+(select amount/datediff(due_date,open_date) from loan) order by loan_number;',
    {replacements: [data],
    type: dailyBill.sequelize.QueryTypes.UPDATE}).then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Bill_payment not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })

}


module.exports = controller;
