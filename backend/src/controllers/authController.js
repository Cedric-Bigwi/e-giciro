const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret, jwtExpiresIn, saltRounds } = require('../config/auth');
const { success } = require('../utils/helpers');

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
}

async function register(req, res, next) {
  try {
    const { phone_number, name, role, password, district } = req.body;

    const existing = await User.findOne({ where: { phone_number } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this phone number already exists.' });
    }

    const hashed = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ phone_number, name, role, password: hashed, district });

    const token = signToken(user);
    return success(res, { user: user.toSafeJSON(), token }, 'Account created successfully.', 201);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { phone_number, password } = req.body;

    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid phone number or password.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid phone number or password.' });
    }

    const token = signToken(user);
    return success(res, { user: user.toSafeJSON(), token }, 'Logged in successfully.');
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    return success(res, { user: req.user.toSafeJSON() }, 'Current user retrieved.');
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
