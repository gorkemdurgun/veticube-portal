import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

// CLINIC BASIS
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
export const ADD_MANAGER_TO_CLINIC: TypedDocumentNode<AddManagerToClinicRes, AddManagerToClinicVar> = gql`
  mutation AddManagerToClinic($user_id: uuid = "", $clinic_id: uuid = "") {
    inserted_manager: insert_clinic_management_manager_clinic_assignments_one(object: { user_id: $user_id, clinic_id: $clinic_id }) {
      user_id
      clinic_id
      assigned_at
    }
  }
`;

// BRANCH BASIS
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
export const REPLY_TO_INVITE: TypedDocumentNode<ReplyToInviteRes, ReplyToInviteVar> = gql`
  mutation UpdateIncomingInvite($id: uuid = "", $status: String) {
    update_clinic_management_invitations_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      status
      invitee_email
      role
    }
  }
`;
export const ADD_CLIENT_TO_BRANCH: TypedDocumentNode<AddClientToBranchRes, AddClientToBranchVar> = gql`
  mutation AddClientToBranch($branch_id: uuid = "", $email: String = "", $full_name: String = "", $phone_number: String = "") {
    client: insert_clinic_management_branch_client_records_one(
      object: { branch_id: $branch_id, email: $email, full_name: $full_name, phone_number: $phone_number }
    ) {
      id
      email
    }
  }
`;
export const ADD_PET_TO_CLIENT: TypedDocumentNode<AddPetToClientRes, AddPetToClientVar> = gql`
  mutation AddPetToClient(
    $owner_id: uuid = ""
    $name: String = ""
    $breed_id: uuid = ""
    $gender: pet_management_gender_enum = unknown
    $birthdate: date = ""
    $medical_notes: String = ""
  ) {
    pet: insert_pet_management_pets_one(
      object: { owner_id: $owner_id, name: $name, breed_id: $breed_id, gender: $gender, birthdate: $birthdate, medical_notes: $medical_notes }
    ) {
      id
      created_at
    }
  }
`;
export const ASSIGN_DEVICE_TO_BRANCH_REQUEST: TypedDocumentNode<AssignDeviceToBranchRequestRes, AssignDeviceToBranchRequestVar> = gql`
  mutation InsertAssignRequests($user_id: uuid, $branch_id: uuid, $device_serial_number: String) {
    insert_iot_management_assign_requests(objects: { user_id: $user_id, branch_id: $branch_id, device_serial_number: $device_serial_number }) {
      affected_rows
      returning {
        id
        user_id
        branch_id
        device_serial_number
        is_assigned
        created_at
        updated_at
      }
    }
  }
`;
