import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export const GET_CLINIC_DETAIL: TypedDocumentNode<GetClinicDetailRes> = gql`
  query GetClinicDetail {
    clinics: clinic_management_clinics {
      id
      clinic_name
      branches {
        id
        branch_name
        phone_number
        city
        address
        employees(order_by: { assigned_at: asc }) {
          user_id
          role
        }
      }
    }
  }
`;
export const GET_PENDING_INVITATIONS: TypedDocumentNode<GetPendingInvitationsRes> = gql`
  query GetPendingInvitations {
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
