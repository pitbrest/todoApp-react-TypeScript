interface IToDo {
  id: number;
  title: string;
  completed: boolean;
}
interface IToDoItem extends IToDo {
  removeTodo: (id: number) => void;
  todoStatusHandler: (id: number) => void;
}

interface IToDoProps {
  items: IToDo[];
  removeTodo: (id: number) => void;
  todoStatusHandler: (id: number) => void;
}

///

interface ITodoState {
  items: IToDo[];
}

export type { IToDo, IToDoItem, IToDoProps, ITodoState };
