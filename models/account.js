'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    account_number: {
      type:
      DataTypes.INTEGER,
      primaryKey:true
    },
    open_date: DataTypes.DATE,
    balance: DataTypes.DOUBLE,
    cif: DataTypes.STRING
  }, {
    tableName: 'account',
    timestamps: false
  });
  account.associate = function(models) {
    // associations can be defined here
  };
  return account;
};