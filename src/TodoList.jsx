import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { task: newTodo.trim(), id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  const updateTodoValue = (e) => setNewTodo(e.target.value);

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const uppercaseAll = () => {
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, task: todo.task.toUpperCase() }))
    );
  };

  const uppercaseOne = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo
      )
    );
  };

  const markAsDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  const markAllAsDone = () => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, isDone: true })));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 animate-fade">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            ToDo App
          </h2>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded hover:shadow"
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Add a task"
            value={newTodo}
            onChange={updateTodoValue}
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={addNewTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <hr className="border-gray-300 dark:border-gray-600 mb-4" />

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded shadow-sm"
            >
              <span
                className={`flex-grow ${
                  todo.isDone
                    ? "line-through text-gray-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {todo.task}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑
                </button>
                <button
                  onClick={() => uppercaseOne(todo.id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Uppercase"
                >
                  🔼
                </button>
                <button
                  onClick={() => markAsDone(todo.id)}
                  className="text-green-500 hover:text-green-700"
                  title="Mark as Done"
                >
                  ✅
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
          <button
            onClick={uppercaseAll}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Uppercase All
          </button>
          <button
            onClick={markAllAsDone}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Mark All as Done
          </button>
        </div>
      </div>
    </div>
  );
}
