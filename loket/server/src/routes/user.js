const express = require("express");
const userController = require("../controllers/user");
const { validate, userValidationRules } = require("../middlewares/validator");
const route = express.Router();
const verifytoken = require("../middlewares/verifytoken");

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

// untuk verify user (hanya user yg udh verify yg bisa create events)
route.post("/verify/", userController.verify.bind(userController));
route.post(
  "/top",
  verifytoken,
  userController.topupCredit.bind(userController)
);

module.exports = route;
