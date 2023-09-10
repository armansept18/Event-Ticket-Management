const db = require("../models");
const Entity = require("./entity");
const jwt = require("jsonwebtoken");
const { Order, User, Event } = require("../models");

class OrderEvents extends Entity {
  constructor(model) {
    super(model);
  }

  async getAllOrders(req, res) {
    try {
      const result = await Order.findAll({
        include: [{ model: db.Event, as: "events" }],
      });

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: "error",
        message: error?.message || "An error occurred.",
      });
    }
  }

  async getOrderById(req, res) {
    try {
      const result = await Order.findByPk(req.params.id, {
        include: [{ model: db.Event, as: "events" }],
      });
      if (!result) throw new Error("Order not found");

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: "error",
        message: error?.message || "An error occurred.",
      });
    }
  }

  async createOrder(req, res) {
    try {
      const { eventId, quantity } = req.body;
      const userId = req.user.id; // Ambil userId dari token

      // check user
      const userData = await User.findByPk(userId);
      if (!userData) throw new Error("User not found");

      // check event
      const eventData = await Event.findByPk(eventId);
      if (!eventData) throw new Error("Event not found");

      // check event stock
      if (eventData.stock - quantity < 0)
        throw new Error("Event stock not enough");
      await eventData.increment({ stock: -quantity });

      // Calculate total price
      const totalPrice = quantity * eventData.price;

      // create order
      const orderData = await Order.create({
        userId, // Menggunakan userId dari token
        eventId,
        quantity,
        fullname: userData.fullname,
        email: userData.email,
        totalPrice,
        eventPrice: eventData.price,
      });
      console.log(orderData);

      // Respond with ticket information
      res.status(201).json({
        status: "success",
        data: {
          ...orderData.toJSON(),
          fullname: `${userData.fullname}`,
          email: `${userData.email}`,
          eventPrice: eventData.price,
          totalPrice,
        },
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: "error",
        message: error?.message || "error dikit gak ngaruh",
      });
    }
  }

  async payment(req, res) {
    try {
      const orderId = req.body.id;
      const userId = req.user.id; // Pastikan user telah terautentikasi

      // Cari data pesanan
      const orderData = await Order.findByPk(orderId);
      if (!orderData) {
        throw new Error("Order not found");
      }

      const userData = await User.findByPk(userId);
      if (!userData) {
        throw new Error("User not found");
      }

      if (orderData.isPayment) {
        throw new Error("Order has already been paid");
      }

      // Cek apakah pengguna memiliki referral code from friend yang belum digunakan
      if (userData.referralCodeFromFriend) {
        throw new Error("Referral code from friend has already been used");
      }

      const totalPrice = orderData.totalPrice;

      // Cek apakah ada referral code from friend yang digunakan dalam permintaan
      if (req.body.referralCodeFromFriend) {
        const referralCodeFromFriend = req.body.referralCodeFromFriend;
        const referredUser = await User.findOne({
          where: { referralCodeFromFriend },
        });

        if (referredUser && !referredUser.referralCodeFromFriendUsed) {
          // Jika referral code from friend valid dan belum digunakan oleh pengguna lain
          const discount = totalPrice - 10000;
          totalPrice -= discount;

          // Update status referral code from friend
          await referredUser.update({
            referralCodeFromFriendUsed: userData.refferalcode,
          });
        }
      }

      if (userData.credit < totalPrice) {
        throw new Error("Insufficient credit");
      }

      const updatedCredit = userData.credit - totalPrice;
      await userData.update({ credit: updatedCredit });

      await orderData.update({ isPayment: true });

      res.status(200).json({
        status: "success",
        message: "Payment successful",
        data: {
          order: orderData.toJSON(),
          updatedCredit,
        },
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: "error",
        message: error?.message || error,
      });
      console.log(error);
    }
  }
}

module.exports = OrderEvents;
