import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AppointmentState {
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    createAppointmentRequest: (state, action: PayloadAction<CreateAppointmentRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createAppointmentSuccess: (state) => {
      state.loading = false;
    },
    createAppointmentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createAppointmentRequest, createAppointmentSuccess, createAppointmentFailure } = appointmentSlice.actions;

export default appointmentSlice.reducer;
