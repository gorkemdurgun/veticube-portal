import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  session: LoginSuccessPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequestPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.isAuthenticated = true;
      state.session = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.session = null;
      state.loading = false;
      state.error = null;
    },
    signUpRequest: (state, action: PayloadAction<SignUpRequestPayload>) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /*
    refreshSessionRequest: (state, action: PayloadAction<RefreshSessionRequestPayload>) => {
      state.loading = true;
    },
    refreshSessionSuccess: (state, action: PayloadAction<CognitoLoginSuccessResponse>) => {
      state.isAuthenticated = true;
      state.session = action.payload;
      state.loading = false;
      state.error = null;
    },
    refreshSessionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
   
    */
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, signUpRequest, signUpSuccess, signUpFailure } = authSlice.actions;

export default authSlice.reducer;
