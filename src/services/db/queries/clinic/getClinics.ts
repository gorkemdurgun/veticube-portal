import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetClinicsResponse = {
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

export const GET_CLINICS: TypedDocumentNode<GetClinicsResponse> = gql`
  query GetClinics {
    clinics: clinic_management_clinics {
      id
      clinic_name
      branches {
        id
        branch_name
        phone_number
        city
        address
        employees(order_by: { assigned_at: asc }) {
          user_id
          role
        }
      }
    }
  }
`;
