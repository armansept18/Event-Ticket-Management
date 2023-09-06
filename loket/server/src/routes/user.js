const express = require("express");
const userController = require("../controllers/user");
const { validate, userValidationRules } = require("../../middleware/validator");
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

//untuk selalu login
route.get("/token", userController.alwaysLogin.bind(userController));

// untuk verify user (hanya user yg udh verify yg bisa create events)
route.post("/verify/v5", userController.verify.bind(userController));

module.exports = route;
