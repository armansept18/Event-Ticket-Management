"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dashboard.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      eventId: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },

      userId: {
        type: DataTypes.INTEGER,

        references: {
          model: "Users", // Nama tabel user dalam basis data Anda
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "dashboard",
    }
  );
  return dashboard;
};
