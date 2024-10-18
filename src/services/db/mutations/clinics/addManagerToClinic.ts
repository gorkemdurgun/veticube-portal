import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation AddManagerToClinic($user_id: uuid = "", $clinic_id: uuid = "") {
    insert_clinic_management_manager_clinic_assignments_one(object: { user_id: $user_id, clinic_id: $clinic_id }) {
      user_id
      clinic_id
      assigned_at
    }
  }
`;

export const addManagerToClinic = async (user_id: string, clinic_id: string) => {
  const { data, errors } = await apolloGqlClient.mutate<{
    clinic: { returning: { user_id: string; clinic_id: string }[] };
  }>({
    mutation: GQL,
    variables: {
      user_id,
      clinic_id,
    },
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });
  return data;
};
