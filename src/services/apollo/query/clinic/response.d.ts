// CLINIC BASIS
type GetClinicDetailRes = {
  clinics: {
    id: string;
    clinic_name: string;
    branches: {
      id: string;
      branch_name: string;
      phone_number: string;
      city: string;
      address: string;
      employees: {
        user_id: string;
        role: string;
      }[];
    }[];
  }[];
};

// BRANCH BASIS
type GetBranchClientRecordsRes = {
  branch_clients: Array<{
    email: string;
    full_name: string;
    phone_number: string;
    created_at: string;
    branch_id: string;
    id: string;
  }>;
};
type GetBranchPendingInvitationsRes = {
  invitations: {
    id: string;
    inviter_id: string;
    invitee_email: string;
    branch_id: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  }[];
};
type GetUserPendingInvitationsRes = {
  user_invitations: {
    id: string;
    inviter_id: string;
    invitee_email: string;
    branch_id: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  }[];
};
