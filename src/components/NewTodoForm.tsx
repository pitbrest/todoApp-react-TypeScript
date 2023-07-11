import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../store/todoSlice";

function NewTodoForm() {
  const [value, setValue] = useState("");

  const inputFieldRef = useRef<HTMLInputElement>(null);
  const cleanupInput = () => setValue("");
  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const dispatch = useAppDispatch();

  const addNewTodo = () => {
    dispatch(addTodo({ title: value }));
    cleanupInput();
  };

  const inputKeybordHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === "Enter") addNewTodo();
  };

  useEffect(() => {
    inputFieldRef.current && inputFieldRef.current.focus();
  }, []);

  return (
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
        className="bg-slate-50 rounded border-2 px-2 py-1 mr-5 active:scale-90 active:border-slate-400 active:bg-slate-00 basis-1/12 shadow-md"
        onClick={() => addNewTodo()}
      >
        add
      </button>
    </div>
  );
}

export default NewTodoForm;
