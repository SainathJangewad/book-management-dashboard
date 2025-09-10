import { configureStore, createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";

interface UIState {
  search: string;
  genre: string;
  status: string;
}

const initialState: UIState = {
  search: "",
  genre: "",
  status: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setSearch, setGenre, setStatus } = uiSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
