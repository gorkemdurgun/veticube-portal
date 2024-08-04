import { gql } from "@apollo/client";

export const GET_CLINIC_AND_BRANCHES = gql`
  query GetClinicAndBranches {
    clinic: clinic_clinics {
      id
      name
      branches: clinic_branches {
        id
        branch_name
        phone
        address
        city
        veterinarians {
          vetId: id
          user {
            userId: id
            email
            first_name
            last_name
            default_role
            allowed_roles
            is_verified
          }
        }
      }
    }
  }
`;
