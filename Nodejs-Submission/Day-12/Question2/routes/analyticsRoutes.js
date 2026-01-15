const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");

// 1️⃣ Total sales per category
router.get("/sales-per-category", async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$category",
          totalSales: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 2️⃣ Top 5 customers by spending
router.get("/top-customers", async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$amount" },
          orders: { $push: "$$ROOT" }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",           // collection name
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },       // convert array to object
      {
        $project: {
          _id: 0,
          name: "$user.name",
          email: "$user.email",
          totalSpent: 1,
          ordersCount: { $size: "$orders" }
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
