const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const Users = require('../models/users.model');

async function login(req, res) {

  const { username, password } = req.body;

  const user = await Users.findOne({ username });
  if (!user) {
    return res.status(403).json({
      error: 'Your username or password is incorrect, if you have this problem again please contact with the Administrator.'
    });
  }

  const isValidPassword = compareSync(password, user.password);

  if (!isValidPassword) return res.status(403).json({
    error: 'Your username or password is incorrect, if you have this problem again please contact with the Administrator.'
  });

  const token = await sign({ _user: user._id }, process.env.TOKEN_SEED, { expiresIn: '1h' });

  return res.status(200).json({
    token
  });
}


module.exports = {
  login
}