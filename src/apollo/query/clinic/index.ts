import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export const GET_CLINICS: TypedDocumentNode<GetClinicsRes> = gql`
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
