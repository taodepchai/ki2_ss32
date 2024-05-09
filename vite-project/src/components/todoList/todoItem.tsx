import { useState } from 'react';
import "./style.css";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}


interface TodoItemProps {
    todo: Todo;
    onToggleComplete: (id: number) => void;
    onDeleteTodo: (id: number) => void;
    onUpdateTodo: (id: number, newText: string) => void;
}

function TodoItem({ todo, onToggleComplete, onDeleteTodo, onUpdateTodo }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdateTodo = () => {
        onUpdateTodo(todo.id, editText);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggleComplete(todo.id)}
                    />
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                    </span>
                </>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Hủy' : 'Sửa'}
            </button>
            {isEditing && (
                <button onClick={handleUpdateTodo}>Cập nhật</button>
            )}
            <button onClick={() => onDeleteTodo(todo.id)}>Xóa</button>
        </li>
    );
}

export default TodoItem;
