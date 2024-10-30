type SendPersonnelInviteRes = {
  insert_clinic_management_invitations_one: { id: string; invitee_email: string; role: string; status: string };
};

type SendPersonnelInviteVar = {
  inviter_id: string;
  invitee_email: string;
  branch_id: string;
  role: string;
};
