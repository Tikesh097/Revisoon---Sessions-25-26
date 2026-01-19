const login = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.cookie("auth", "true", {
      httpOnly: true
    });

    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { login };
