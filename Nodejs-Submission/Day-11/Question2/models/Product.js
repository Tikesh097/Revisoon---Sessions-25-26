const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      index: true 
    },
    price: {
      type: Number,
      required: true,
      index: true 
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      index: true 
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);


productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
