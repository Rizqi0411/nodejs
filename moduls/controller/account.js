var jsonResult = require('../jsonResult');
var account = require('../../models').account;
var path = require('path');
var dateFormat = require('dateformat');

var controller = function () {}

controller.getAll = function (req, res) {
    var data = req.body
    account.sequelize.query('select a.cif,a.account_number,c.first_name,c.last_name,a.open_date,a.balance from account as a inner join customer as c on a.cif = c.cif;',{replacements: [data],type: account.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Accounts not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByid = function (req, res) {
    var account_number = req.params.account_number;
    account.findByPk(account_number).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Accounts not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByCif = function (req, res) {
    var cif = req.params.cif;
    account.sequelize.query('select a.account_number, a.cif, c.first_name, c.last_name, a.open_date, a.balance, a.cif from account as a inner join customer as c on a.cif=c.cif where a.cif = ?',
        {replacements:[cif],
            type: account.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Accounts not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.add = function (req, res, nect) {
    var data = req.body
    console.log(data)
    account.create(data).then( entity => {
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
    var data = req.params.account_number
    account.findOne({where: {account_number: data}}).then(entity => {
        if (entity) {
            return entity.update(req.body)
        }else {
            throw 'account not Found'
        }
    }).then(entity => {
        res.json(jsonResult(200, 'success', entity))
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.delete = function (req, res, next) {
    var account_number = req.params.account_number;
    account.destroy({where:{account_number : account_number}}).then(affectedRows => {
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
