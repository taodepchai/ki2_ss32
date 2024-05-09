import { useState } from 'react';
import "./style.css";
import TodoForm from './todoForm';
import TodoItem from './todoItem';
import Swal from 'sweetalert2';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  });

  const updateLocalStorage = (updatedTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         const updatedTodos = todos.filter((todo) => todo.id !== id);
         setTodos(updatedTodos);
         updateLocalStorage(updatedTodos);
        }
      });
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  const handleUpdateTodo = (id: number, newText: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          );
          setTodos(updatedTodos);
          updateLocalStorage(updatedTodos);
        }
      });    
  };

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            onUpdateTodo={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
