import { ITodoItem } from "../types/types";

const TodoItem: React.FC<ITodoItem> = ({ title, completed, removeTodo, todoStatusHandler }) => {
  return (
    <div className="flex items-star my-2 gap-x-3 justify-start w-full">
      <input
        className="self-center basis-1/12"
        type="checkbox"
        name=""
        id=""
        checked={completed}
        onChange={todoStatusHandler}
      />
      <p
        className={
          !completed
            ? "bg-slate-50 border rounded p-2 pt-[5px] basis-9/12"
            : "bg-red-100 border rounded p-2 pt-[5px] basis-9/12"
        }
      >
        {title}
      </p>

      <button
        className="bg-slate-50 rounded border px-2 py-1 mr-5 active:scale-90 active:border-slate-400 active:bg-slate-100 shadow-md"
        onClick={removeTodo}
      >
        remove
      </button>
    </div>
  );
};

export default TodoItem;
