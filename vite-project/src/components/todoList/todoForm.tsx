import React, { useState } from 'react';
import "./style.css";

interface TodoFormProps {
    onAddTodo: (text: string) => void;
  }

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Thêm công việc mới" 
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default TodoForm;