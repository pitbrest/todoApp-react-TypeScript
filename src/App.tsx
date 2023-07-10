import { useState, useEffect, useRef } from "react";
import TodoList from "./components/TodoList";
import { IToDo } from "./types/types";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<IToDo[]>([]);

  const inputFieldRef = useRef<HTMLInputElement>(null);
  const cleanupInput = () => setValue("");

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const inputKeybordHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === "Enter") addTodo();
  };
  const addTodo = () => {
    if (value && value.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          completed: false,
        },
      ]);
    }
    cleanupInput();
  };
  const removeTodo = (id: number) =>
    setTodos(todos.filter((item) => item.id !== id));

  const todoStatusHandler = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed },
      ),
    );
  };

  useEffect(() => {
    inputFieldRef.current && inputFieldRef.current.focus();
  }, []);

  return (
    <div className="container px-12 py-20 text-slate-800">
      <div className="max-w-lg mx-auto">
        <div className="flex mb-10 h-[40px]">
          <input
            className="bg-slate-50 border px-2 py-1 mr-5 rounded w-4/6 outline-slate-400 basis-11/12"
            type="text"
            value={value}
            onChange={inputHandler}
            onKeyDown={inputKeybordHandler}
            ref={inputFieldRef}
          />
          <button
            className="bg-slate-50 rounded border px-2 py-1 mr-5 active:scale-90 active:border-slate-400 active:bg-slate-100 basis-1/12 shadow-md"
            onClick={addTodo}
          >
            add
          </button>
        </div>

        <TodoList
          items={todos}
          removeTodo={removeTodo}
          todoStatusHandler={todoStatusHandler}
        />
      </div>
    </div>
  );
}

export default App;
