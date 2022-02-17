const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

module.exports = app => {
  const signIn = async (request, response) => {
    if (!request.body.email || !request.body.password) {
      return response.status(400).send("Informe o usuário e senha!");
    }

    const user = await app.db("users").where({ email: request.body.email }).first();
    if (!user) {
      return response.status(400).send("Usuário e senha inválidos!");
    }
    const isMatch = bcrypt.compareSync(request.body.password, user.password);
    if (!isMatch) return response.status(401).send("Usuário e senha inválidos!");

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now,
      exp: now + ((60 * 60) * 24)
    }

    response.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    })
  }

  const validateToken = async (req, res) => {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) return res.send(true);
      }
    } catch (error) {
      // problema com o token
    }

    res.send(false);
  }

  return { signIn, validateToken };
}