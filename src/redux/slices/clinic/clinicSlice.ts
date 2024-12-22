import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface ClinicState {
  loading: boolean;
  error: string | null;
  assignments: GetUserClinicAssignmentsSuccessPayload["assignments"];
}

const initialState: ClinicState = {
  loading: false,
  error: null,
  assignments: [],
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
    },
    updateEmployeeInviteRequest: (state, action: PayloadAction<UpdateEmployeeInviteRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeInviteSuccess: (state) => {
      state.loading = false;
    },
    updateEmployeeInviteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserClinicAssignmentsRequest: (state, action: PayloadAction<GetUserClinicAssignmentsRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    getUserClinicAssignmentsSuccess: (state, action: PayloadAction<GetUserClinicAssignmentsSuccessPayload>) => {
      state.assignments = action.payload.assignments;
      state.loading = false;
    },
    getUserClinicAssignmentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createClinicRequest,
  createClinicSuccess,
  createClinicFailure,
  updateEmployeeInviteRequest,
  updateEmployeeInviteSuccess,
  updateEmployeeInviteFailure,
  getUserClinicAssignmentsRequest,
  getUserClinicAssignmentsSuccess,
  getUserClinicAssignmentsFailure,
} = clinicSlice.actions;

export default clinicSlice.reducer;
