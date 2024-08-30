import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetClinicBranchEmployeesResponse = {
  employees: {
    veterinarians: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
      };
    }[];
    staffs: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
      };
    }[];
  };
};

export const GET_CLINIC_BRANCH_EMPLOYEES: TypedDocumentNode<GetClinicBranchEmployeesResponse> = gql`
  query GetClinicBranchEmployees($clinicBranchId: uuid = "") {
    employees: clinic_clinic_branches_by_pk(id: $clinicBranchId) {
      veterinarians {
        id
        user {
          first_name
          last_name
        }
      }
      staffs {
        id
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
