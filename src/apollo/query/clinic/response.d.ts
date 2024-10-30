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
type GetPendingInvitationsRes = {
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
