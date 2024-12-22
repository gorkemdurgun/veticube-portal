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
type GetFilteredBranchClientRecordsRes = {
  branch_clients: Array<{
    email: string;
    full_name: string;
    phone_number: string;
    created_at: string;
    branch_id: string;
    id: string;
    pets: Array<{
      id: string;
      name: string;
    }>;
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
type GetBranchDeviceAssignmentsRes = {
  device_assignments: {
    id: string;
    device_id: string;
    branch_id: string;
    device_nickname: string;
    iot_device: {
      id: string;
      device_type: string;
      device_model: string;
      serial_number: string;
    };
  }[];
};
type GetBranchDeviceAssignmentRequestsRes = {
  branch_device_assignment_requests: {
    is_assigned: boolean;
    device_serial_number: string;
    created_at: string;
    updated_at: string;
    branch_id: string;
    id: string;
    user_id: string;
  }[];
};
