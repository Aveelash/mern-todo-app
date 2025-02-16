import React, { useState } from "react";

const TaskItem = ({ task, toggleComplete, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [completed, setCompleted] = useState(task.completed);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, newText);
    }
    setIsEditing(!isEditing);
  };

  const handleToggleComplete = () => {
    setCompleted(!completed);
    toggleComplete(task._id);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: completed ? "line-through" : "none" }}
          onClick={handleToggleComplete}
        >
          {task.text}
        </span>
      )}

      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
