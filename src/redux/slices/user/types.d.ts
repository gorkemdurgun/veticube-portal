/* eslint-disable no-unused-vars */

/* GET USER */

type GetUserSuccessPayload = {
  user: {
    id: string;
    full_name: string;
    email: string;
    phone_number?: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  assignments: {
    role: UserRole;
    assigned_at: string;
    branch: {
      id: string;
      branch_name: string;
    };
  }[];
};
