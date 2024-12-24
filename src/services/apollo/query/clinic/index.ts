import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

// CLINIC BASIS
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

// BRANCH BASIS
export const GET_FILTERED_BRANCH_CLIENT_RECORDS: TypedDocumentNode<GetFilteredBranchClientRecordsRes, GetFilteredBranchClientRecordsVar> = gql`
  query GetBranchClientRecords($branchId: uuid = "", $limit: Int = 10, $offset: Int = 0, $searchTerm: String = "%") {
    records: clinic_management_branch_client_records(
      where: {
        branch_id: { _eq: $branchId }
        _or: [
          { full_name: { _ilike: $searchTerm } }
          { email: { _ilike: $searchTerm } }
          { phone_number: { _ilike: $searchTerm } }
          { pet_records: { name: { _ilike: $searchTerm } } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      email
      full_name
      phone_number
      created_at
      branch_id
      id
      pet_records {
        id
        name
      }
    }
  }
`;
export const GET_UNOWNED_PET_RECORDS: TypedDocumentNode<GetUnownedPetRecordsRes, GetUnownedPetRecordsVar> = gql`
  query GetUnownedPetRecords($limit: Int = 10, $offset: Int = 0, $searchTerm: String = "%") {
    records: clinic_management_branch_pet_records(
      where: { client_id: { _is_null: true }, name: { _ilike: $searchTerm } }
      limit: $limit
      offset: $offset
    ) {
      birthdate
      breed_id
      gender_id
      chip_number
      name
      created_at
      updated_at
      id
    }
  }
`;
export const GET_BRANCH_PENDING_INVITATIONS: TypedDocumentNode<GetBranchPendingInvitationsRes> = gql`
  query GetBranchPendingInvitations {
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
export const GET_USER_PENDING_INVITATIONS: TypedDocumentNode<GetUserPendingInvitationsRes, GetUserPendingInvitationsVar> = gql`
  query GetUserPendingInvitations($userEmail: String = "") {
    user_invitations: clinic_management_invitations(where: { invitee_email: { _eq: $userEmail }, status: { _eq: "pending" } }) {
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
export const GET_BRANCH_DEVICE_ASSIGNMENTS: TypedDocumentNode<GetBranchDeviceAssignmentsRes, GetBranchDeviceAssignmentsVar> = gql`
  query GetBranchDeviceAssignments($branchId: uuid = "") {
    device_assignments: iot_management_iot_device_assignments(where: { branch_id: { _eq: $branchId } }) {
      id
      device_id
      branch_id
      device_nickname
      iot_device {
        id
        device_type
        device_model
        serial_number
      }
    }
  }
`;
export const GET_BRANCH_DEVICE_ASSIGNMENT_REQUESTS: TypedDocumentNode<GetBranchDeviceAssignmentRequestsRes> = gql`
  query GetAssignRequests {
    branch_device_assignment_requests: iot_management_assign_requests(where: { is_assigned: { _eq: false } }) {
      is_assigned
      device_serial_number
      created_at
      updated_at
      branch_id
      id
      user_id
    }
  }
`;
