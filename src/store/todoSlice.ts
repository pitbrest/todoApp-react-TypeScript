import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IToDo, ITodoState } from "../types/types";

const initialState: ITodoState = {
  items: [],
  loading: false,
  error: null,
};

// Тут далее в дженерик передаем типы параметров функции createAsyncThunk (<Returned, ThunkArg, ThunkApiConfig>):
// 1-параметр - возвращаемое функцией значение;
// 2-ой параметр - аргументы этой функции (в нашем случае стоит нижнее подчеркивание, что значит аргументов нет);
// 3-ий параметр - определенные аргументы этой функции (в примеры из аргументов мы будем использовать ошибку, значит мы должны ее описать)

export const fetchTodos = createAsyncThunk<
  IToDo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );
  if (!response.ok) {
    return rejectWithValue("Server error");
  }
  const data = await response.json();
  return data;
});

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
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addTodo, removeTodo, todoStatusHandler } = todoSlice.actions;
export default todoSlice.reducer;
