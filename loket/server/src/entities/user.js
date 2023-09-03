const db = require("../models");
const Entity = require("../entities/entity"); // Perhatikan perubahan dari "./enity" ke "./entity"
const bcrypt = require("bcrypt");
class User extends Entity {
  constructor(model) {
    super(model);
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({
        where: {
          email: email,
          password: password,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      if (user) {
        return res.status(200).json({ message: "Login berhasil", user });
      } else {
        return res.status(401).json({ message: "Email atau password salah" });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari user:", error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mencari user" });
    }
  }
  register(req, res) {
    const { email, password, fullname } = req.body;

    // Cek apakah email sudah ada dalam database
    db.User.findOne({ where: { email } })
      .then((existingUser) => {
        if (existingUser) {
          res.status(400).send({ message: "Email sudah terdaftar" });
        } else {
          // Jika email belum terdaftar, buat pengguna baru
          db.User.create({ email, password, fullname })
            .then((newUser) => {
              // Kirim respons sukses
              res
                .status(201)
                .send({ message: "Registrasi berhasil", user: newUser });
            })
            .catch((error) => {
              console.error(
                "Terjadi kesalahan saat membuat pengguna baru:",
                error
              );
              res.status(500).send(error.message);
            });
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mencari email:", error);
        res.status(500).send(error.message);
      });
  }
}

module.exports = User;
