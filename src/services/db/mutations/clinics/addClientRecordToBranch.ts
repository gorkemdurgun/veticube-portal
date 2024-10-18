import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation AddClientRecordToBranch($email: String, $full_name: String, $phone_number: String, $branch_id: uuid) {
    client_record: insert_clinic_management_branch_client_records(
      objects: { email: $email, full_name: $full_name, phone_number: $phone_number, branch_id: $branch_id }
    ) {
      affected_rows
      returning {
        email
        full_name
        phone_number
        created_at
        branch_id
        id
      }
    }
  }
`;

export const addClientRecordToBranch = async (email: string, full_name: string, branch_id: string, phone_number?: string) => {
  const { data, errors } = await apolloGqlClient.mutate<{
    clinic: { returning: { id: string; email: string; full_name: string; phone_number: string; created_at: string; branch_id: string }[] };
  }>({
    mutation: GQL,
    variables: {
      email,
      full_name,
      phone_number,
      branch_id,
    },
  });
  return data;
};
