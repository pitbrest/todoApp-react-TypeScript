import { IToDoProps } from "../types/types";
import TodoItem from "./TodoItem";

function TodoList(props: IToDoProps) {
  const { items, removeTodo, todoStatusHandler } = props;

  return (
    <div>
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          removeTodo={removeTodo}
          todoStatusHandler={todoStatusHandler}
        />
      ))}
    </div>
  );
}

export default TodoList;
