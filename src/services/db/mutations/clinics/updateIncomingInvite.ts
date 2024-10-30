import { gql } from "@apollo/client";

import { apolloClient } from "@/apollo/client";

const GQL = gql`
  mutation UpdateIncomingInvite($id: uuid = "", $status: String) {
    update_clinic_management_invitations_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      status
      invitee_email
      role
    }
  }
`;

export const updateIncomingInvite = async (id: string, status: "accepted" | "rejected") => {
  const { data } = await apolloClient.mutate<{
    update_clinic_management_invitations_by_pk: { status: string; invitee_email: string; role: UserRole };
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
