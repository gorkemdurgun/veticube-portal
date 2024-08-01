import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClinicState {
  loading: boolean;
  error: string | null;
}

const initialState: ClinicState = {
  loading: false,
  error: null,
};

const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    createClinicRequest: (state, action: PayloadAction<CreateClinicRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createClinicSuccess: (state) => {
      state.loading = false;
    },
    createClinicFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { createClinicRequest, createClinicSuccess, createClinicFailure } = clinicSlice.actions;

export default clinicSlice.reducer;
