import {
  GET_CLINIC_DETAIL,
  GET_FILTERED_BRANCH_CLIENT_RECORDS,
  GET_BRANCH_PENDING_INVITATIONS,
  GET_USER_PENDING_INVITATIONS,
  GET_BRANCH_DEVICE_ASSIGNMENTS,
  GET_BRANCH_DEVICE_ASSIGNMENT_REQUESTS,
  GET_UNOWNED_PET_RECORDS
} from "./clinic";

export const clinicQueries = {
  GetClinicDetail: GET_CLINIC_DETAIL,
  GetFilteredBranchClientRecords: GET_FILTERED_BRANCH_CLIENT_RECORDS,
  GetUnownedPetRecords: GET_UNOWNED_PET_RECORDS,
  GetBranchPendingInvitations: GET_BRANCH_PENDING_INVITATIONS,
  GetUserPendingInvitations: GET_USER_PENDING_INVITATIONS,
  GetBranchDeviceAssignments: GET_BRANCH_DEVICE_ASSIGNMENTS,
  GetBranchDeviceAssignmentRequests: GET_BRANCH_DEVICE_ASSIGNMENT_REQUESTS
};
