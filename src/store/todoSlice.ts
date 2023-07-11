import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState } from "../types/types";

const initialState: ITodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,

  reducers: {
    addTodo(state, action: PayloadAction<{ title: string }>): void {
      if (action.payload.title.trim()) {
        state.items.push({
          id: Date.now(),
          title: action.payload.title,
          completed: false,
        });
      }
    },

    removeTodo(state, action: PayloadAction<{ id: number }>): void {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    todoStatusHandler(state, action: PayloadAction<{ id: number }>): void {
      state.items = state.items.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...item, completed: !item.completed },
      );
    },
  },
});

export const { addTodo, removeTodo, todoStatusHandler } = todoSlice.actions;
export default todoSlice.reducer;
