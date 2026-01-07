const ApiUser = require("../models/ApiUser");
const crypto = require("crypto");

exports.generateApiKey = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await ApiUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registerd! ",
      });
    }

    const apiKey = "ak_" + crypto.randomBytes(16).toString("hex");

    const user = await ApiUser.create({ email, apiKey });
    res.status(201).json({
      success: true,
      message: "ApiKey Generated Succesfully ",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
