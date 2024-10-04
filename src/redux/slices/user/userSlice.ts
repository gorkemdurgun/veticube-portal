import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: GetUserSuccessPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
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
  },
});

export const { getUserRequest, getUserSuccess, getUserFailure } = userSlice.actions;

export default userSlice.reducer;
