import axios from "axios";

// Base URL from dummy API
const API_URL = 'https://jsonplaceholder.typicode.com';

// Get all items 
export const getItems = () => axios.get(`${API_URL}/posts`);

// Add new item
export const addItem = (data) => axios.post(`${API_URL}/posts`, data);

// Edit an item
export const editItem = (id, data) => axios.put(`${API_URL}/posts/${id}`, data);

// Delete an item
export const deleteItem = (id) => axios.delete(`${API_URL}/posts/${id}`);