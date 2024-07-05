import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface ThemeState {
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: ThemeState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    }
  },
});

export const { toggleDarkMode, setMode } = themeSlice.actions;

export default themeSlice.reducer;
