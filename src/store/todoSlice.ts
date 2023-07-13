import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { IToDo, ITodoState } from "../types/types";

const initialState: ITodoState = {
  items: [],
  loading: false,
  error: null,
};

// Тут далее в дженерик передаем типы параметров функции createAsyncThunk (<Returned, ThunkArg, ThunkApiConfig>):
// 1-параметр - возвращаемое значение или результат работы функции;
// 2-ой параметр - аргументы этой функции (в нашем случае в первом createAsyncThunk стоит нижнее подчеркивание, что значит аргументов нет, для того чтоб загрузить тудушки с сервера нам не нужно в функции запроса передавать аргументы, нужен только запрос. Если в функции передается параметры или несколько то их нужно описать по типам);
// 3-ий параметр - определенные аргументы этой функции (в нашем случае в первом createAsyncThunk из аргументов мы будем использовать ошибку, значит мы должны ее описать, в некоторых следующих Thunk будет больше аргументов)

const fetchTodos = createAsyncThunk<IToDo[], undefined, { rejectValue: string }>(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    if (!response.ok) {
      return rejectWithValue("Server error");
    }
    const todos = await response.json();
    return todos;
  },
);

const addNewTodo = createAsyncThunk<IToDo, { title: string }, { rejectValue: string }>(
  "todos/addTodo",
  async function ({ title }, { rejectWithValue }) {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      return rejectWithValue("Can't add task. Server error");
    }
    return (await response.json()) as IToDo;
  },
);

const removeTodo = createAsyncThunk<{ id: number }, { id: number }, { rejectValue: string }>(
  "todos/deleteTodo",
  async function ({ id }, { rejectWithValue, dispatch }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return rejectWithValue("Can't remove task. Server error");
    }
    return { id };
  },
);

const toggleTodoStatus = createAsyncThunk<
  IToDo,
  { id: number },
  { rejectValue: string; state: { todos: ITodoState } }
>("todos/toggleTodoStatus", async function ({ id }, { rejectWithValue, getState }) {
  const currentTodoStatus = getState().todos.items.filter((todo) => todo.id === id)[0].completed;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: !currentTodoStatus,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    return rejectWithValue("Can't toggle status. Server error");
  }
  return (await response.json()) as IToDo;
});

//// Далее описываем слайс

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,

  reducers: {
    // addTodo(state, action: PayloadAction<{ title: string }>): void {
    //   if (action.payload.title.trim()) {
    //     state.items.push({
    //       id: Date.now(),
    //       title: action.payload.title,
    //       completed: false,
    //     });
    //   }
    // },
    // removeTodo(state, action: PayloadAction<{ id: number }>): void {
    //   state.items = state.items.filter((item) => item.id !== action.payload.id);
    // },
    // todoStatusHandler(state, action: PayloadAction<{ id: number }>): void {
    //   state.items = state.items.map((item) =>
    //     item.id !== action.payload.id
    //       ? item
    //       : { ...item, completed: !item.completed },
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      })
      .addCase(toggleTodoStatus.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id !== action.payload.id ? item : { ...item, completed: !item.completed },
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export { fetchTodos, addNewTodo, removeTodo, toggleTodoStatus };
export default todoSlice.reducer;
