const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({ text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error adding tasks" });
  }
});

router.put("/toggle/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json("Task not found");
    }
    task.completed = !task.completed;
    await task.save();
  } catch (error) {
    res.status(500).json({ error: "Error Toggling task" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!task) {
      res.status(400).json("Task not found");
    }
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error Editing tasks" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json("task not found");
    }
    res.json("Task Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: "Error Deleting task" });
  }
});

module.exports = router;
