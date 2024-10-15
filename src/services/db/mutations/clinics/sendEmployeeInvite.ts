import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation SendEmployeeInvite($inviter_id: uuid = "", $invitee_email: String = "", $branch_id: uuid = "", $role: String = "") {
    insert_clinic_management_invitations_one(
      object: { inviter_id: $inviter_id, invitee_email: $invitee_email, branch_id: $branch_id, role: $role }
    ) {
      id
      invitee_email
      role
      status
    }
  }
`;

export const sendEmployeeInvite = async (inviter_id: string, invitee_email: string, branch_id: string, role: UserRole) => {
  const { data } = await apolloGqlClient.mutate<{
    insert_clinic_management_invitations_one: { id: string; invitee_email: string; role: string; status: string };
  }>({
    mutation: GQL,
    variables: {
      inviter_id,
      invitee_email,
      branch_id,
      role,
    },
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });
  return data;
};
