const express = require("express");
const { validateUser } = require("../middleware/validation");
const router = express.Router();

router.post("/register", validateUser, (req, res) => {
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    user: req.body
  });
});

module.exports = router;
