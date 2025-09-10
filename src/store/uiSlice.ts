import { configureStore, createSlice,type PayloadAction } from "@reduxjs/toolkit";

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

const uiSlice = createSlice({
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

export const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
