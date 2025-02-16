import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTask = async (text) => {
  const res = await axios.post(API_URL, { text });
  return res.data;
};

export const toggleComplete = async (id) => {
  const res = await axios.put(`${API_URL}/toggle/${id}`);
  return res.data;
};

export const editTask = async (id, newText) => {
  const res = await axios.put(`${API_URL}/edit/${id}`, { text: newText });
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
