'use strict';
module.exports = (sequelize, DataTypes) => {
  const daily_bill = sequelize.define('daily_bill', {
    id_bill: {type:
      DataTypes.INTEGER,
      primaryKey:true},
    loan_number: DataTypes.INTEGER,
    cif: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    due_date: DataTypes.DATE
  }, {
    timestamps:false,
    tableName: 'daily_bill'
  });
  daily_bill.associate = function(models) {
    // associations can be defined here
  };
  return daily_bill;
};