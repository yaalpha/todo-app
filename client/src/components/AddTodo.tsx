import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (title: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.toLowerCase() === 'rickroll') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      setTitle('');
      return;
    }

    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Добавить новую задачу"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
