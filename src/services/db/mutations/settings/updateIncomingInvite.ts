import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation UpdateIncomingInvite($id: uuid = "", $status: String) {
    update_clinic_management_invitations_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      status
    }
  }
`;

export const updateIncomingInvite = async (id: string, status: string) => {
  const { data } = await apolloGqlClient.mutate<{
    update_clinic_management_invitations_by_pk: { status: string };
  }>({
    mutation: GQL,
    variables: {
      id,
      status,
    },
    context: {
      headers: {
        "x-hasura-role": "user",
      },
    },
  });
  return data;
};
