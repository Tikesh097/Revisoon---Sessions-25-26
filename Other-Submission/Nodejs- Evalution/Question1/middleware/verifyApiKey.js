const ApiUser = require("../models/ApiUser");

const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.query.apiKey;
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. valid api key required",
        error: "Invalid Api Key",
      });
    }

    const user = await ApiUser.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. valid api key required",
        error: "Invalid Api Key",
      });
    }

    req.apiUser = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = verifyApiKey;
