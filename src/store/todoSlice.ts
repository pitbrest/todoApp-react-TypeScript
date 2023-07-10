import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState } from "../types/types";

const initialState: ITodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,

  reducers: {
    addTodo(state, action: PayloadAction<{ data: string }>) {
      if (action.payload.data.trim()) {
        state.items.push({
          id: Date.now(),
          title: action.payload.data,
          completed: false,
        });
      }
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    todoStatusHandler(state, action: PayloadAction<number>) {
      state.items = state.items.map((item) =>
        item.id !== action.payload
          ? item
          : { ...item, completed: !item.completed },
      );
    },
  },
});

export const { addTodo, removeTodo, todoStatusHandler } = todoSlice.actions;
export default todoSlice.reducer;
