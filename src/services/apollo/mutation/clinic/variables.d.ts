// CLINIC BASIS
type CreateClinicVar = {
  clinic_name: string;
};
type AddManagerToClinicVar = {
  user_id?: string | null;
  clinic_id?: string | null;
};

// BRANCH BASIS
type CreateBranchVar = {
  clinic_id: string;
  branch_name: string;
  city: string;
  address?: string;
  phone_number?: string;
};
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
type AddClientToBranchVar = {
  branch_id: string;
  email: string;
  full_name: string;
  phone_number?: string;
};
type AddPetToClientVar = {
  owner_id: string;
  name: string;
  breed_id?: string;
  gender?: string;
  birthdate?: string;
  medical_notes?: string;
};