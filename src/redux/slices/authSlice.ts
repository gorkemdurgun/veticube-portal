import { createSlice } from "@reduxjs/toolkit";

import type {
  CognitoLoginSuccessResponse,
  GetUserSuccessResponse,
  LoginRequestPayload,
  RefreshSessionRequestPayload,
} from "../../services/cognito/login/types";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  session: CognitoLoginSuccessResponse | null;
  user: GetUserSuccessResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  session: null,
  user: null,
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
    loginSuccess: (state, action: PayloadAction<CognitoLoginSuccessResponse>) => {
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
      state.user = null;
      state.loading = false;
      state.error = null;
    },
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
    signUpVetAccountRequest: (state, action: PayloadAction<SignUpVetAccountRequestPayload>) => {
      state.loading = true;
    },
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<GetUserSuccessResponse>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  refreshSessionRequest,
  refreshSessionSuccess,
  refreshSessionFailure,
  signUpVetAccountRequest,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
