const express = require("express");
const userController = require("../controllers/user");
const { validate, userValidationRules } = require("../middlewares/validator");
const verifyToken1 = require("../middlewares/verifyToken");
const route = express.Router();

//get all user
route.get("/", userController.getAll.bind(userController));

//get name by id
route.get("/:id", userController.getById.bind(userController));

//untuk register
route.post(
  "/v1",
  userValidationRules(), // validator
  validate,
  userController.register.bind(userController)
);

//untuk login
route.post("/v2", userController.login.bind(userController));

//untuk selalu login (untuk front end)
route.get("/token", userController.alwaysLogin.bind(userController));
route.get(
  "/dataEvents",
  verifyToken1,
  userController.viewPurchasedEvents.bind(userController)
);
// untuk verify user (hanya user yg udh verify yg bisa create events)
route.post("/verify/", userController.verify.bind(userController));
route.post(
  "/topup",
  verifyToken1,
  userController.topupCredit.bind(userController)
);

module.exports = route;
