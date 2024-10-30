import { gql } from "@apollo/client";

import { apolloClient } from "@/apollo/client";



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
  const { data, errors } = await apolloClient.mutate<{
    client_record: {
      affected_rows: number;
      returning: {
        email: string;
        full_name: string;
        phone_number: string;
        created_at: string;
        branch_id: string;
        id: string;
      }[];
    };
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
