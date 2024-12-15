import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const todoController = {
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении задач' });
    }
  },

  async createTodo(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const todo = new Todo({
        title,
        completed: false
      });
      const savedTodo = await todo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании задачи' });
    }
  },

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      if (!todo) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении задачи' });
    }
  },

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      res.status(200).json({ message: 'Задача успешно удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении задачи' });
    }
  }
};
