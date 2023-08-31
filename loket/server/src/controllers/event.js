const db = require("../models");
const eventControllers = {
  getAll(req, res) {
    db.Event.findAll()
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
  getById(req, res) {
    const { id } = req.params;
    db.Event.findByPk(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
  getByEventName(req, res) {
    const { eventName } = req.query;
    db.Event.findAll({
      where: ({ eventName } = { [db.Sequelize.Op.like]: `%${eventName}%` }),
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
  createEvent(req, res) {
    db.Event.create({ ...req.body })
      .then((result) => res.send({ message: `EVENT CREATED!` }))
      .catch((err) => res.status(500).send(err?.message));
  },
  editEvent(req, res) {
    const { id } = req.params;
    db.Event.update({ ...req.body }, { where: { id } })
      .then((result) =>
        res.send({ message: `EVENT ID ${id} SUCCESSFULLY EDITED!` })
      )
      .catch((err) => res.status(500).send(err?.message));
  },
  deleteEvent(req, res) {
    const { id } = req.params;
    db.Event.destroy({ where: { id } })
      .then((result) => res.send({ message: `EVENT ID ${id} DELETED!` }))
      .catch((err) => res.status(500).send({ message: err?.message }));
  },
  getAllEventWithUser(req,res) {
    db.Event.findAll({
      include: {model: db.User, as: user},
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message))
  },
};

module.exports = eventControllers;
