"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        fullname: "admin",
        email: "admin@mail.com",
        password: "arifarifah",
        referralCode: "5VVU4W",
        referralCodeFromFriend: "JF3EHB",
        credit: 500000,
        createdAt: Sequelize.fn("NOW"),
        updatedAt: Sequelize.fn("NOW"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
