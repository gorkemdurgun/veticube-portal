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
