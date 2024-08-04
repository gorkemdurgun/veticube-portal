type GetClinicAndBranchesResponse = {
  clinic: {
    id: string;
    name: string;
    branches: {
      id: string;
      branch_name: string;
      phone: string;
      address: string;
      city: string;
      veterinarians: {
        vetId: string;
        user: {
          userId: string;
          email: string;
          first_name: string;
          last_name: string;
          default_role: string;
          allowed_roles: string;
          is_verified: boolean;
        };
      }[];
    }[];
  }[];
};
