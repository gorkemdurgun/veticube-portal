import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  loading: boolean;
  error: string | null;
  breeds: Breed[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  breeds: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getBreedsSuccess: (state, action: PayloadAction<Breed[]>) => {
      state.loading = false;
      state.breeds = action.payload;
      state.error = null;
    },
  },
});

export const { getBreedsSuccess } = appSlice.actions;

export default appSlice.reducer;
