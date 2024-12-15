import React, { useEffect, useState, useCallback } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { todoService } from './services/todoService';
import { ITodo } from './interfaces/ITodo';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark'
  );
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  }, []);

  useEffect(() => {
    loadTodos();
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark, loadTodos]);

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await todoService.createTodo({
        title,
        completed: false
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      handleError(error);
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const todo = todos.find(t => t._id === id);
      if (todo) {
        const updatedTodo = await todoService.updateTodo(id, {
          completed: !todo.completed
        });
        setTodos(todos.map(t => t._id === id ? updatedTodo : t));
      }
    } catch (error) {
      handleError(error);
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      handleError(error);
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleError = (error: any) => {
    setError(error.message || 'Произошла ошибка при подключении к серверу');
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="app">
      <ThemeToggle onToggle={toggleTheme} isDark={isDark} />
      <h1>Список задач</h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default App;
