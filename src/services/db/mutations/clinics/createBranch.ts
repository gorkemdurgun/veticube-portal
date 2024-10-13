import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

export const GQL = gql`
  mutation InsertBranch($clinic_id: uuid, $branch_name: String, $city: String, $address: String, $phone_number: String) {
    insert_branch: insert_clinic_management_branches(
      objects: { clinic_id: $clinic_id, branch_name: $branch_name, address: $address, city: $city, phone_number: $phone_number }
    ) {
      affected_rows
      returning {
        id
        clinic_id
        branch_name
        city
        address
        phone_number
        created_at
        updated_at
      }
    }
  }
`;

export const createBranch = async (clinic_id: string, branch_name: string, city: string, address?: string, phone_number?: string) => {
  const { data, errors } = await apolloGqlClient.mutate<{
    branch: { returning: { id: string; clinic_id: string; branch_name: string; city: string; address: string; phone_number: string }[] };
  }>({
    mutation: GQL,
    variables: {
      clinic_id,
      branch_name,
      city,
      address,
      phone_number,
    },
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });

  return { data, errors };
};

