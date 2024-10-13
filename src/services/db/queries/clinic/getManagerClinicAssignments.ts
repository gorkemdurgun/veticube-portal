import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetManagerClinicAssignmentsResponse = {
  manager_clinic_assignments: {
    clinic: {
      id: string;
      clinic_name: string;
      branches: {
        id: string;
        branch_name: string;
        phone_number: string;
        city: string;
        address: string;
      }[];
    };
  }[];
};
export const GET_MANAGER_CLINIC_ASSIGNMENTS: TypedDocumentNode<GetManagerClinicAssignmentsResponse> = gql`
  query GetManagerClinicAssignments {
    manager_clinic_assignments: clinic_management_manager_clinic_assignments {
      clinic {
        id
        clinic_name
        branches {
          id
          branch_name
          phone_number
          city
          address
        }
      }
    }
  }
`;
