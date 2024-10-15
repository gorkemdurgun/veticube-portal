import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetEmployeeInvitationsResponse = {
  invitations: {
    id: string;
    inviter_id: string;
    invitee_email: string;
    branch_id: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  }[];
};

export const GET_EMPLOYEE_INVITATIONS: TypedDocumentNode<GetEmployeeInvitationsResponse> = gql`
  query GetEmployeeInvitations {
    invitations: clinic_management_invitations(where: { status: { _eq: "pending" } }) {
      id
      inviter_id
      invitee_email
      branch_id
      role
      status
      created_at
      updated_at
    }
  }
`;
