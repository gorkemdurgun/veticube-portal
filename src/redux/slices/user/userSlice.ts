import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  error: string | null;
  user: GetUserSuccessPayload["user"] | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<GetUserSuccessPayload>) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserRequest, getUserSuccess, getUserFailure } = userSlice.actions;

export default userSlice.reducer;
