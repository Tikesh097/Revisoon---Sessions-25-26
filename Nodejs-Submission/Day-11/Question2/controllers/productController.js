const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      category,
      rating,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (category) {
      filter.category = { $in: category.split(",") };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    let sortOption = {};
    if (sort) {
      sort.split(",").forEach((field) => {
        if (field.startsWith("-")) {
          sortOption[field.substring(1)] = -1;
        } else {
          sortOption[field] = 1;
        }
      });
    } else {
      sortOption.createdAt = -1;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
