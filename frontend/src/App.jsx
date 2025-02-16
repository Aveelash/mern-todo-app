import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  toggleComplete,
  editTask,
  deleteTask,
} from "./services/taskServices";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (text) => {
    const newTask = await addTask(text);
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const handleToggleComplete = async (id) => {
    const updatedTask = await toggleComplete(id);
    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    }
  };

  const handleEditTask = async (id, newText) => {
    const updatedTask = await editTask(id, newText);
    if (updatedTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <TaskForm addTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={handleToggleComplete}
        editTask={handleEditTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default App;
