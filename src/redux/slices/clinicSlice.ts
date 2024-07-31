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
  },
});

export const { createClinicRequest } = clinicSlice.actions;

export default clinicSlice.reducer;
