
var jsonResult = require('../jsonResult');
var loan = require('../../models').loan;
var path = require('path');
var dateFormat = require('dateformat');

var controller = function () {}

controller.getAll = function(req, res, next) {
    var data = req.body
    console.log(data);
    loan.sequelize.query('select c.first_name, c.last_name,l.* from loan as l inner join customer as c on l.cif = c.cif',
        {replacements:[data],type:loan.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Loans not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findByid = function (req, res) {
    var loan_number = req.params.loan_number
    loan.findByPk(loan_number).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        }else {
            throw 'Loans not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}


controller.findByCif = function(req, res) {
    var cif = req.params.cif;
    loan.sequelize.query('select * from loan where cif = ?',
        {replacements:[cif],
            type: loan.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        } else {
            throw 'Loans not found'
        }
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.findByAN = function(req, res) {
    var account_number = req.params.account_number;
    loan.sequelize.query('select * from loan where account_number = ?',
        {replacements:[account_number],
            type: loan.sequelize.QueryTypes.SELECT}).then(entity => {
        if (entity){
            res.json(jsonResult(200,'success', entity))
        } else {
            throw 'Loans not found'
        }
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}



controller.add = function (req, res, nect) {
    var  cif = req.body.cif;
    var loan_type_code = req.body.loan_type_code;
    var amount = req.body.amount;
    var tenor = req.body.tenor;
    loan.sequelize.query('insert into loan (cif,loan_type_code,amount,balance,open_date,tenor,due_date) values (?,?,?,amount,current_date,?,adddate(open_date, interval tenor month))',
        {replacements: [cif,loan_type_code,amount,tenor],
        type: loan.sequelize.QueryTypes.INSERT}).then( entity => {
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
    var data = req.params.loan_number
    loan.findOne({where: {loan_number: data}}).then(entity => {
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
    var loan_number = req.params.loan_number
    loan.destroy({where:{loan_number : loan_number}}).then(affectedRows => {
        if (affectedRows){
            res.json(jsonResult(200, 'success'))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.updateBalance = function(req, res, next){
    
}
module.exports = controller;
