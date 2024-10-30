type SendPersonnelInviteVar = {
  inviter_id: string;
  invitee_email: string;
  branch_id: string;
  role: string;
};
type ReplyToInviteVar = {
  id?: string;
  status: string;
};
type CreateClinicVar = {
  clinic_name: string;
};
type CreateBranchVar = {
  clinic_id: string;
  branch_name: string;
  city: string;
  address?: string;
  phone_number?: string;
};
type AddManagerToClinicVar = {
  user_id?: string | null;
  clinic_id?: string | null;
};
