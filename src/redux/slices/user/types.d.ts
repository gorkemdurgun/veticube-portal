/* eslint-disable no-unused-vars */

/* GET USER */

type GetUserSuccessPayload = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone_number?: string;
  created_at: string;
  updated_at: string;
};

type GetManagerSuccessPayload = {
  id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
};
type GetVeterinarianSuccessPayload = {
  id: string;
  specialty: string;
  branch_id: string;
  created_at: string;
  updated_at: string;
};
type GetNurseSuccessPayload = {
  id: string;
  branch_id: string;
  created_at: string;
  updated_at: string;
};
type GetSecretarySuccessPayload = {
  id: string;
  branch_id: string;
  created_at: string;
  updated_at: string;
};
type GetClientSuccessPayload = {
  id: string;
  created_at: string;
  updated_at: string;
};