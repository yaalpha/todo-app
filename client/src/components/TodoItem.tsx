import React from 'react';
import { ITodo } from '../interfaces/ITodo';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id!)}
      />
      <span>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id!)}>Удалить</button>
    </div>
  );
};
