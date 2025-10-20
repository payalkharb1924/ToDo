import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useToDo } from "../contexts";
import { useState } from "react";

function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useToDo();
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsEditable(false);
  };
  const toggle = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`cursor-pointer overflow-hidden
      w-full h-12 rounded-2xl shadow-lg flex gap-3 justify-between items-center px-4 bg-opacity-10 border-b border-gray-100 text-gray-100 ${
        todo.completed ? "bg-gray-100/15 line-through" : ""
      }`}
    >
      <input
        onClick={toggle}
        type="checkbox"
        checked={todo.completed}
        className="w-4 h-4 accent-zinc-400 cursor-pointer rounded-md border-gray-300 focus:ring-2 focus:ring-zinc-300 focus:outline-none hover:scale-105 transition-transform"
      />

      <div className="flex w-full justify-between ">
        <p
          hidden={isEditable ? true : false}
          className="font-medium border-none"
        >
          {todo.todo}
        </p>
        <input
          type="text"
          value={todoMsg}
          autoFocus
          onChange={(e) => setTodoMsg(e.target.value)}
          hidden={isEditable ? false : true}
          className="flex-1 mr-2 min-w-0 rounded border border-gray-400 px-2 py-1"
        />
        <div className="flex gap-2">
          <div className="flex hover:text-zinc-700">
            <button
              onClick={editTodo}
              className="cursor-pointer"
              hidden={isEditable ? false : true}
            >
              <FaSave />
            </button>
            <button
              onClick={() => setIsEditable(true)}
              className={`${
                todo.completed ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              hidden={isEditable ? true : false}
              disabled={todo.completed}
            >
              <MdModeEdit />
            </button>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="hover:text-zinc-700 cursor-pointer"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
