const dashboard = require("../models/dashboard");
const Entity = require("./entity");
const db = require("../models");

class Dashboard extends Entity {
  constructor(model) {
    super(model);
  }
  async viewPurchasedEvents(req, res) {
    try {
      const userId = req.user.id; // Mengambil ID user dari token yang diautentikasi

      // Menggunakan model acara (events) yang sesuai dengan aplikasi Anda
      const Event = db.Event;

      // Mengambil semua acara (events) yang sudah dibeli oleh user dengan ID yang sesuai
      const purchasedEvents = await Event.findAll({
        where: {
          userId: userId, // Sesuaikan dengan nama kolom yang digunakan di model Anda
        },
      });

      if (!purchasedEvents || purchasedEvents.length === 0) {
        return res
          .status(404)
          .send("Tidak ada acara yang dibeli oleh user ini.");
      }

      // Mengirimkan daftar acara (events) yang sudah dibeli sebagai respons
      res.send({ purchasedEvents });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
module.exports = Dashboard;
