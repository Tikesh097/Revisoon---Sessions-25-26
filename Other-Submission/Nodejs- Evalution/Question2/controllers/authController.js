const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hash });

  res.json({ token: generateToken(user) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email, isActive: true });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ message: "Invalid Credentials" });

  res.json({ token: generateToken(user) });
};
