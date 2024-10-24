import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  loading: boolean;
  error: string | null;
  activeBranch: string | null;
  branchClients: BranchClients[];
  breedList: Breed[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  activeBranch: null,
  branchClients: [],
  breedList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveBranchRequest: (state, action: PayloadAction<SetActiveBranchRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    setActiveBranchSuccess: (state, action: PayloadAction<SetActiveBranchSuccessPayload>) => {
      state.loading = false;
      state.activeBranch = action.payload.branch_id;
      state.branchClients = action.payload.branch_clients;
    },
    setActiveBranchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setBreedList: (state, action: PayloadAction<Breed[]>) => {
      state.breedList = action.payload;
    },
  },
});

export const { setActiveBranchRequest, setActiveBranchSuccess, setActiveBranchFailure, setBreedList } = appSlice.actions;

export default appSlice.reducer;
