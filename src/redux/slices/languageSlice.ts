import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LanguageState {
  language: "tr" | "en";
}

// Define the initial state using that type
const initialState: LanguageState = {
  language: "en",
};

export const languageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"tr" | "en">) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
