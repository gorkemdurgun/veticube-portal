import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "@/localization/i18n";

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

// Define a type for the slice state
interface AuthState {
  user: User | null;
  accessToken: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
