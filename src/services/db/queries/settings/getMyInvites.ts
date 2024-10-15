import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetMyInvitesResponse = {
  invites: {
    id: string;
    invitee_email: string;
    role: string;
    created_at: string;
    branch: {
      branch_name: string;
    };
  }[];
};

export const GET_MY_INVITES: TypedDocumentNode<GetMyInvitesResponse> = gql`
  query GetMyInvites {
    invites: clinic_management_invitations(where: { status: { _eq: "pending" } }) {
      id
      invitee_email
      role
      created_at
      branch {
        branch_name
      }
    }
  }
`;
