"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Event, {
        as: "events",
        foreignKey: "id",
      });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      referralCode: DataTypes.STRING,
      referralCodeFromFriend: DataTypes.STRING,
      credit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
