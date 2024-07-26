import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const getClinicAndBranches = async () => {
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
          }
        }
      }
    `,
  });

  return data.clinic[0];
};
