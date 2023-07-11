import TodoItem from "./TodoItem";
import { useAppSelector, useAppDispatch } from "../hooks";
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
          removeTodo={() => dispatch(removeTodo({ id: todo.id }))}
          todoStatusHandler={() => dispatch(todoStatusHandler({ id: todo.id }))}
        />
      ))}
    </div>
  );
}

export default TodoList;
