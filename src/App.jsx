import { useState, useEffect } from "react";
import { ToDoProvider, useToDo } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import bgImage from "./assets/bgImage.jpg";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem("todos"));
    if (allTodos && allTodos.length > 0) {
      setTodos(allTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <ToDoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
        className="font-[Poppins] bg-zinc-950 bg-cover bg-center w-full min-h-screen flex flex-col justify-center items-center px-4"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="text-4xl sm:text-5xl md:text-8xl text-white mt-6 font-bold text-center bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 rounded-2xl shadow-lg p-4">
          Welcome to TODO World
        </div>
        <div className="flex flex-col md:flex-row w-full flex-1 justify-center items-center mt-8">
          <div className="w-full md:w-1/2 h-auto md:h-3/4 flex justify-center items-center p-4">
            <div className="bg-white-400 w-full min-h-[300px] max-h-[70vh] overflow-y-auto rounded-2xl shadow-lg flex flex-col p-4  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
              <TodoForm />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-auto md:h-3/4 flex justify-center items-center p-4">
            <div className="bg-white-400 w-full min-h-[300px] max-h-[70vh] overflow-y-auto rounded-2xl shadow-lg flex flex-col p-4  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
              {todos.map((todo) => (
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
