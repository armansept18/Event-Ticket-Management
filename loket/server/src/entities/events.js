const db = require("../models");
const Entity = require("../entities/entity");
const jwt = require("jsonwebtoken");

class Event extends Entity {
  constructor(model) {
    super(model);
  }
  deleteById(req, res) {
    const { id } = req.params;
    db[this.model]
      .destroy({
        where: { id },
      })
      .then(() => res.send({ message: "success" }))
      .catch((err) => res.status(500).send(err.message));
  }
  updateById(req, res) {
    const { id } = req.params;
    console.log(req.body);
    db[this.model]
      .update(
        { ...req.body },
        {
          where: { id },
        }
      )
      .then(() => this.getById(req, res))
      .catch((err) => res.status(500).send(err.message));
  }
  editEvent(req, res) {
    const { id } = req.params;
    db.Event.update({ ...req.body }, { where: { id } })
      .then((result) =>
        res.send({ message: `EVENT ID ${id} SUCCESSFULLY EDITED!` })
      )
      .catch((err) => res.status(500).send(err?.message));
  }

  async createEvent(req, res) {
    const { token } = req;
    const dataToken = jwt.verify(token, process.env.jwt_secret);
    const eventData = req.body;
    try {
      db.Event.create({
        ...eventData,
        userid: dataToken.id,
      })
        .then((result) => res.send({ message: `EVENT CREATED!` }))
        .catch((err) => res.status(500).send(err?.message, "tes"));
      console.log(eventData);
    } catch (err) {
      console.log(err);
      res.status(500).send(err?.message);
    }
  }
  getAllEventWithUser(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  getEventByUserId(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
      where: {
        userid: req.params.userid,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async createUserAndEvent(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        const newUser = await db.User.create(
          { ...req.body.users },
          { transaction: t }
        );
        const events = { ...req.body.events, userid: newUser.dataValues.id };
        await db.Event.create({ ...events }, { transaction: t });
        return res.send({ message: "EVENT AND USER SUCCESSFULLY ADDED!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err?.message });
    }
  }
  getEventByFilter(req, res) {
    const { location, category } = req.query;
    db.Event.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          location: { [db.Sequelize.Op.like]: `%${location}%` },
          category: { [db.Sequelize.Op.like]: `%${category}%` },
        },
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  authenticate(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(400)
        .send({ message: "Token diperlukan untuk pendaftaran acara." });
    }

    // Menghilangkan kata "Bearer " dari token untuk mendapatkan token
    const tokenString = token.replace("Bearer ", "");

    try {
      const dataToken = jwt.verify(tokenString, process.env.jwt_secret);
      req.user = dataToken;
      next(); // Lanjutkan ke penanganan pendaftaran setelah autentikasi berhasil
    } catch (error) {
      return res.status(401).send({ message: "Token otentikasi tidak valid." });
    }
  }
  async registerParticipant(req, res) {
    const { token } = req;
    const { fullname, email } = req.body;
    const { id: eventId } = req.params;

    if (!token) {
      return res
        .status(400)
        .send({ message: "Token diperlukan untuk pendaftaran acara." });
    }

    try {
      // Verifikasi token untuk mendapatkan data pengguna
      const dataToken = jwt.verify(token, process.env.jwt_secret);

      // Buat peserta baru
      const participant = await db.Participant.create({
        fullname,
        email,
        // Menggunakan eventId dari parameter URL
        userId: dataToken.id, // Menggunakan ID pengguna dari token
      });

      const transaction = await this.createTransaction(participant.id, eventId);

      return res.status(201).send({
        message: "Pendaftaran peserta berhasil.",
        participant,
        transaction,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Terjadi kesalahan dalam pendaftaran peserta." });
    }
  }

  async createTransaction(participantId, eventId) {
    try {
      // Buat transaksi terkait dengan pendaftaran peserta
      const transaction = await db.Transaction.create({
        participantId,
        eventId,
        // Jumlah pembayaran atau informasi pembayaran lainnya bisa ditambahkan di sini
      });

      return transaction;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan dalam pembuatan transaksi.");
    }
  }
}
module.exports = Event;
