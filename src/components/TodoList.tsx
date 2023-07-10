import TodoItem from "./TodoItem";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";
import { removeTodo, todoStatusHandler } from "../store/todoSlice";

function TodoList() {
  const todos = useAppSelector((state) => state.todos.items);
  const dispatch = useAppDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          removeTodo={() => dispatch(removeTodo(todo.id))}
          todoStatusHandler={() => {
            dispatch(() => todoStatusHandler(55));
          }}
        />
      ))}
    </div>
  );
}

export default TodoList;
