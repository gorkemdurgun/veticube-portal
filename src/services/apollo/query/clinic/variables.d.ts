// CLINIC BASIS
// --------------------

// BRANCH BASIS

type GetPetRecordsVar = {
  branchId: string;
  limit?: number;
  offset?: number;
  searchTerm?: string;
  isStray?: boolean;
};
type GetUserPendingInvitationsVar = {
  userEmail?: string;
};
type GetBranchDeviceAssignmentsVar = {
  branchId: string;
};
