type GetClinicsRes = {
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