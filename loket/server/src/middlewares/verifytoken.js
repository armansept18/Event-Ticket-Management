const jwt = require("jsonwebtoken");

const verifyToken1 = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "gagal" });
  }
  const tokenString = token.replace("Bearer ", "");

  try {
    const dataToken = jwt.verify(tokenString, process.env.jwt_secret);
    req.user = dataToken;
    next(); // Lanjutkan ke penanganan pendaftaran setelah autentikasi berhasil
  } catch (error) {
    return res.status(401).send({ message: "Token otentikasi tidak valid." });
  }
};

module.exports = verifyToken1;
