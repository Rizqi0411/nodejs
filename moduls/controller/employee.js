var jsonResult = require('../jsonResult');
var employee = require('../../models').employee;
var path = require('path');
var dateFormat = require('dateformat');

var controller = function () {}

controller.getAll = function (req, res, next) {
    employee.findAll().then(entity => {
        if (entity){
            res.json(jsonResult(200, 'success', entity))
        }else {
            throw 'Loans not found';
        }
    }).catch(error => {
        res.json(jsonResult(500,error.message))
    })
}

controller.findUsername = function (req, res) {
    var username = req.params.username;
    employee.sequelize.query('select * from employee where username like ?%',
        {replacements: [username],
        type: employee.sequelize.QueryTypes.SELECT}).then(entity => {
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
    var id = req.params.id
    employee.findByPk(id).then(entity => {
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
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var roll = req.body.roll;
    employee.sequelize.query('insert into employee (name,email,username,password,roll) values (?,?,?,PASSWORD(?),?)',
        {replacements:[name,email,username,password,roll],
        type: employee.sequelize.QueryTypes.INSERT}).then( entity => {
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
    var data = req.params.id
    employee.findOne({where: {id: data}}).then(entity => {
        if (entity) {
            return entity.update(req.body)
        }else {
            throw 'Employee not Found'
        }
    }).then(entity => {
        res.json(jsonResult(200, 'success', entity))
    }).catch(error => {
        res.json(jsonResult(500, error.message))
    })
}

controller.delete = function (req, res, next) {
    var id = req.params.id
    employee.destroy({where:{id : id}}).then(affectedRows => {
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
