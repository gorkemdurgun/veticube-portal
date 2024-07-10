import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "@/localization/i18n";

// Define a type for the slice state
interface LanguageState {
  preferredLanguage: "tr" | "en";
}

// Define the initial state using that type
const initialState: LanguageState = {
  preferredLanguage: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"tr" | "en">) => {
      state.preferredLanguage = action.payload;
      i18n.changeLanguage(state.preferredLanguage);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
