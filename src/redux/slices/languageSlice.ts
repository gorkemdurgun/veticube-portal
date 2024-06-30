import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
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
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageState>) => {
      state.preferredLanguage = action.payload.preferredLanguage;
      i18n.changeLanguage(state.preferredLanguage === "tr" ? "tr" : "en");
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
