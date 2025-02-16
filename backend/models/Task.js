const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    required: false,
  },
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
