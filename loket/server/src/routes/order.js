const express = require("express");
const OrderController = require("../controllers/transaksi");

const verifyToken1 = require("../middlewares/verifytoken");

const route = express.Router();

route.get("/", OrderController.getAll.bind(OrderController));

route.get("/:id", OrderController.getById.bind(OrderController));

// // Rute untuk membuat transaksi baru
route.post(
  "/tes",
  verifyToken1,
  OrderController.createOrder.bind(OrderController)
);

// // Rute untuk mengubah status pembayaran transaksi
route.put("/pay", verifyToken1, OrderController.payment.bind(OrderController));

route.delete("/:id", OrderController.deleteById.bind(OrderController));

module.exports = route;
