const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('please provide email and password');
  }

  const id = new Date().getDate();
  //payload,secret and options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  return res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const { username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello ${username}`,
    secret: `lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
