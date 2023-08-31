const db = require("../models")

const userControllers = {
  getAll(req, res) {
    db.User.findAll()
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
  getById(req, res) {
    const { id } = req.params;
    db.User.findByPk(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },
  createUser(req, res) {
    db.User.create({ ...req.body })
      .then((result) => res.send({ message: `USER CREATED!` }))
      .catch((err) => res.status(500).send(err?.message));
  },
  deleteUser(req, res) {
    const { id } = req.params;
    db.User.destroy({ where: { id } })
      .then((result) => res.send({ message: `USER ID ${id} DELETED!` }))
      .catch((err) => res.status(500).send({ message: err?.message }));
  },
};

module.exports = userControllers;