import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

const reqRole = "manager";
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