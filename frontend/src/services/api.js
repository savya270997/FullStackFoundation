import axios from "axios";

const API_BASE = "/api/users";

export const getUsers = () => axios.get(API_BASE);
export const addUser = (name) => axios.post(API_BASE, { name });
export const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`);
export const updateUser = (id, name) =>
  axios.put(`${API_BASE}/${id}`, { name });
