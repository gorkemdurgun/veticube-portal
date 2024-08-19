import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  clientSession: LoginSuccessPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  clientSession: null,
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
      state.clientSession = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.clientSession = null;
      state.loading = false;
      state.error = null;
    },
    refreshSessionRequest: (state, action: PayloadAction<RefreshSessionRequestPayload>) => {
      state.loading = true;
    },
    refreshSessionSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.isAuthenticated = true;
      state.clientSession = action.payload;
      state.loading = false;
      state.error = null;
    },
    refreshSessionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTokens: (state, action: PayloadAction<{ idToken: string; accessToken: string; refreshToken: string }>) => {
      state.clientSession = {
        ...state.clientSession!,
        idToken: action.payload.idToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    signUpVetAccountRequest: (state, action: PayloadAction<SignUpVetAccountRequestPayload>) => {
      state.loading = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  refreshSessionRequest,
  refreshSessionSuccess,
  refreshSessionFailure,
  logout,
  setTokens,
  signUpVetAccountRequest,
} = authSlice.actions;

export default authSlice.reducer;
