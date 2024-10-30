type SendPersonnelInviteRes = {
  insert_clinic_management_invitations_one: { id: string; invitee_email: string; role: string; status: string };
};
type ReplyToInviteRes = {
  update_clinic_management_invitations_by_pk: {
    status: string;
    invitee_email: string;
    role: string;
  };
};
type CreateClinicRes = {
  insert_clinic: {
    affected_rows: number;
    returning: {
      id: string;
      clinic_name: string;
      created_at: string;
      updated_at: string;
    }[];
  };
};
type CreateBranchRes = {
  insert_branch: {
    affected_rows: number;
    returning: {
      id: string;
      clinic_id: string;
      branch_name: string;
      city: string;
      address: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
    }[];
  };
};
type AddManagerToClinicRes = {
  inserted_manager: {
    user_id: string;
    clinic_id: string;
    assigned_at: string;
  };
};
