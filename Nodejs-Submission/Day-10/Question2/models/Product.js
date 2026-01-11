const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  description: String,
});

// Text index for search
productSchema.index({ name: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
