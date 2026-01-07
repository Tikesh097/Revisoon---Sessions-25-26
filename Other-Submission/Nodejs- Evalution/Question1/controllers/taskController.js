const Task = require("../models/Task");

exports.getAllTask = async (req, res) => {
  try {
    let filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    let query = Task.find(filter);

    if (req.query.sortBy) {
      query = query.sort(req.query.sortBy);
    }

    const tasks = await query;
    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task Created Succesfully",
      data: tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const tasks = await Task.findByIdAndDelete(req.parms.id);
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Task not Found",
      });
    }
    res.json({
      success: true,
      message: "Task Deleted Succesfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
