const express = require("express");
const OrderController = require("../controllers/transaksi");
const verifyToken1 = require("../middlewares/verifyToken");

const route = express.Router();

route.get("/", OrderController.getAll.bind(OrderController));

route.get("/:id", OrderController.getById.bind(OrderController));

// Rute untuk membuat transaksi baru
route.post(
  "/create",
  verifyToken1,
  OrderController.createOrder.bind(OrderController)
);

// Rute untuk mengubah status pembayaran transaksi
route.put("/payment", verifyToken1, OrderController.payment.bind(OrderController));

route.delete("/:id", OrderController.deleteById.bind(OrderController));

module.exports = route;
