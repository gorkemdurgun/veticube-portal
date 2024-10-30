import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export const SEND_PERSONNEL_INVITE: TypedDocumentNode<SendPersonnelInviteRes, SendPersonnelInviteVar> = gql`
  mutation SendPersonnelInvite($inviter_id: uuid = "", $invitee_email: String = "", $branch_id: uuid = "", $role: String = "") {
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
