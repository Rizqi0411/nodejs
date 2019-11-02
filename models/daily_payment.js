'use strict';
module.exports = (sequelize, DataTypes) => {
  const daily_payment = sequelize.define('daily_payment', {
    id_payment: {type:DataTypes.INTEGER,
    primaryKey:true},
    account_number: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    payment_date: DataTypes.DATE
  }, {
    tableName:'daily_payment',
    timestamps:false
  });
  daily_payment.associate = function(models) {
    // associations can be defined here
  };
  return daily_payment;
};