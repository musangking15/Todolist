import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { actions } from "../features/todos/todosSlice";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(todo.content);

  const handleToggle = (id) => {
    dispatch(actions.toggleTodo({ id }));
  };

  const handleRemove = (id) => {
    dispatch(actions.deleteTodo({ id }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (id) => {
    dispatch(actions.editTodo({ id, content: updatedContent }));
    setEditing(false);
  };

  return (
    <div className="flex justify-between p-2 bg-slate-300 rounded mb-4 items-center">
      {editing ? (
        <input type="text" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} className="border border-gray-300 rounded p-1" />
      ) : (
        <p className="font-semibold" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.content}
        </p>
      )}
      <div className="flex gap-1 items-center">
        <input type="checkbox" name="completed" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
        <label className="font-medium" htmlFor="completed">
          Completed
        </label>
        <div></div>
        {editing ? (
          <button className="btn" onClick={() => handleSave(todo.id)}>
            <GiCheckMark />
          </button>
        ) : (
          <button className="btn" onClick={handleEdit}>
            <RiEdit2Fill />
          </button>
        )}
        <button className="btn" onClick={() => handleRemove(todo.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
