const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products.js");
require("dotenv").config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/productsdb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
