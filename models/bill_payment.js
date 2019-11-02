'use strict';
module.exports = (sequelize, DataTypes) => {
  const bill_payment = sequelize.define('bill_payment', {
    id_payment: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    billing_id: DataTypes.INTEGER,
    loan_number: DataTypes.INTEGER,
    account_number: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    payment_date: DataTypes.DATE
  }, {
    timestamps:false,
    tableName:'daily_payment'
  });
  bill_payment.associate = function(models) {
    // associations can be defined here
  };
  return bill_payment;
};