import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

const reqRole = "manager";
export type GetClinicAndBranchesResponse = {
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

/*
export const getClinicAndBranches = async () => {
  const reqRole = "manager";
  const { data } = await apolloGqlClient.query<GetClinicAndBranchesResponse>({
    query: gql`
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
    `,
    context: {
      headers: {
        "x-hasura-role": reqRole,
      },
    },
  });

  return data.clinic[0];
};
*/