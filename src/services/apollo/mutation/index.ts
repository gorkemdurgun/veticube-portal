import {
  SEND_PERSONNEL_INVITE,
  REPLY_TO_INVITE,
  CREATE_CLINIC,
  CREATE_BRANCH,
  ADD_MANAGER_TO_CLINIC,
  ADD_CLIENT_TO_BRANCH,
  ADD_PET_TO_CLIENT,
  ASSIGN_DEVICE_TO_BRANCH_REQUEST,
} from "./clinic";

export const clinicMutations = {
  sendPersonnelInvite: SEND_PERSONNEL_INVITE,
  replyToInvite: REPLY_TO_INVITE,
  createClinic: CREATE_CLINIC,
  createBranch: CREATE_BRANCH,
  addManagerToClinic: ADD_MANAGER_TO_CLINIC,
  addClientToBranch: ADD_CLIENT_TO_BRANCH,
  addPetToClient: ADD_PET_TO_CLIENT,
  assignDeviceToBranchRequest: ASSIGN_DEVICE_TO_BRANCH_REQUEST,
};
