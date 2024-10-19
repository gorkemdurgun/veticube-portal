import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetBranchClientsResponse = {
  branch_clients: {
    email: string;
    full_name: string;
    phone_number: string;
    created_at: string;
    id: string;
    pets: {
      id: string;
      name: string;
    }[];
  }[];
};

export const GET_BRANCH_CLIENTS: TypedDocumentNode<GetBranchClientsResponse> = gql`
  query GetBranchClientRecords($branch_id: uuid = "") {
    branch_clients: clinic_management_branch_client_records(where: { branch_id: { _eq: $branch_id } }) {
      email
      full_name
      phone_number
      created_at
      id
      pets {
        id
        name
      }
    }
  }
`;
