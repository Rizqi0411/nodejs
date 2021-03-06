var jsonResult = require('../jsonResult');
var billing = require('../../models').billing;
var path = require('path');
var dateFormat = require('dateformat');
var cron = require('node-cron');

var controller = function () {}

controller.getAll = function (req, res, next) {
    billing.findAll().then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Billings not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByid = function (req, res) {
    var billing_id = req.params.billing_id
    billing.findByPk(billing_id).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Billings not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}


controller.add = function (req, res, next) {
    var data = req.body
    console.log(data)
    billing.create(data).then( entity => {
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
    var data = req.params.billing_id
    billing.findOne({where: {billing_id: data}}).then(entity => {
        if (entity) {
            return entity.update(req.body)
        }else {
            throw 'Billing not Found'
        }
    }).then(entity => {
        res.json(jsonResult(200, 'success', entity))
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.delete = function (req, res, next) {
    var billing_id = req.params.billing_id
    billing.destroy({where:{billing_id : billing_id}}).then(affectedRows => {
        if (affectedRows){
            res.json(jsonResult(200, 'success'))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByLoanId = function (req, res, next) {
    var loan_number = req.params.loan_number
    billing.sequelize.query('select * from billing where loan_number = ?',
        {replacements: [loan_number],
        type: billing.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Billings not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

module.exports = controller;
