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
export const CREATE_CLINIC: TypedDocumentNode<CreateClinicRes, CreateClinicVar> = gql`
  mutation InsertClinic($clinic_name: String) {
    insert_clinic: insert_clinic_management_clinics(objects: { clinic_name: $clinic_name }) {
      affected_rows
      returning {
        id
        clinic_name
        created_at
        updated_at
      }
    }
  }
`;
export const CREATE_BRANCH: TypedDocumentNode<CreateBranchRes, CreateBranchVar> = gql`
  mutation InsertBranch($clinic_id: uuid, $branch_name: String, $city: String, $address: String, $phone_number: String) {
    insert_branch: insert_clinic_management_branches(
      objects: { clinic_id: $clinic_id, branch_name: $branch_name, address: $address, city: $city, phone_number: $phone_number }
    ) {
      affected_rows
      returning {
        id
        clinic_id
        branch_name
        city
        address
        phone_number
        created_at
        updated_at
      }
    }
  }
`;
export const ADD_MANAGER_TO_CLINIC: TypedDocumentNode<AddManagerToClinicRes, AddManagerToClinicVar> = gql`
  mutation AddManagerToClinic($user_id: uuid = "", $clinic_id: uuid = "") {
    inserted_manager: insert_clinic_management_manager_clinic_assignments_one(object: { user_id: $user_id, clinic_id: $clinic_id }) {
      user_id
      clinic_id
      assigned_at
    }
  }
`;

