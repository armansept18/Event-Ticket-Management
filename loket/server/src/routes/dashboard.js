const express = require("express");
const dashboardControllers = require("../controllers/dashboard");

const verifyToken1 = require("../middlewares/verifyToken");

const route = express.Router();

route.get(
  "/",
  verifyToken1,
  dashboardControllers.viewPurchasedEvents.bind(dashboardControllers)
);
module.exports = route;
