"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Tambahkan asosiasi di sini jika diperlukan
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama model yang merujuk
          key: "id", // Nama kolom yang menjadi primary key di tabel users
        },
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "events", // Nama model yang merujuk
          key: "id", // Nama kolom yang menjadi primary key di tabel events
        },
      },
      eventPrice: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      isPayment: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
