import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  error: string | null;
  user: GetUserSuccessPayload | null;
  account: {
    manager: GetManagerSuccessPayload | null;
    veterinarian: GetVeterinarianSuccessPayload | null;
    nurse: GetNurseSuccessPayload | null;
    secretary: GetSecretarySuccessPayload | null;
    client: GetClientSuccessPayload | null;
  };
}

const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
  account: {
    manager: null,
    veterinarian: null,
    nurse: null,
    secretary: null,
    client: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<GetUserSuccessPayload>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setAccountManager: (state, action: PayloadAction<GetManagerSuccessPayload>) => {
      state.account.manager = action.payload;
    },
    setAccountVeterinarian: (state, action: PayloadAction<GetVeterinarianSuccessPayload>) => {
      state.account.veterinarian = action.payload;
    },
    setAccountNurse: (state, action: PayloadAction<GetNurseSuccessPayload>) => {
      state.account.nurse = action.payload;
    },
    setAccountSecretary: (state, action: PayloadAction<GetSecretarySuccessPayload>) => {
      state.account.secretary = action.payload;
    },
    setAccountClient: (state, action: PayloadAction<GetClientSuccessPayload>) => {
      state.account.client = action.payload;
    },
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  setAccountManager,
  setAccountVeterinarian,
  setAccountNurse,
  setAccountSecretary,
  setAccountClient,
} = userSlice.actions;

export default userSlice.reducer;
