import axios from 'axios';
import { ITodo } from '../interfaces/ITodo';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const todoService = {
  async getAllTodos(): Promise<ITodo[]> {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  async createTodo(todo: Omit<ITodo, '_id'>): Promise<ITodo> {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  },

  async updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo> {
    const response = await axios.put(`${API_URL}/todos/${id}`, todo);
    return response.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${API_URL}/todos/${id}`);
  }
};

