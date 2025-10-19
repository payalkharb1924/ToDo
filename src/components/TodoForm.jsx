import React, { useEffect, useState } from "react";
import { useToDo } from "../contexts";

function TodoForm() {
  const { addTodo } = useToDo();
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ todo });
    setTodo("");
  };
  return (
    <div className="w-full h-full rounded-2xl flex justify-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="w-full max-w-3xl flex h-full justify-center p-5">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-8"
        >
          <h1 className="text-gray-100/20 text-4xl font-extrabold">
            Add a To Do
          </h1>
          <input
            type="text"
            placeholder="Write here..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-full h-1/2 p-3 text-white max-w-3xl border border-gray-100/20 rounded-sm"
          />
          <button
            type="submit"
            className="w-1/2 h-18 rounded-md bg-gray-100/20 text-xl text-zinc-800 font-bold hover:bg-transparent hover:text-gray-100/20 hover:border cursor-pointer"
          >
            Add
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default TodoForm;
