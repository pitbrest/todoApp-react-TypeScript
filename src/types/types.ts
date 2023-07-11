interface IToDo {
  id: number;
  title: string;
  completed: boolean;
}

interface ITodoItem extends IToDo {
  removeTodo: () => void;
  todoStatusHandler: () => void;
}

interface ITodoState {
  items: IToDo[];
}

export type { IToDo, ITodoState, ITodoItem };
