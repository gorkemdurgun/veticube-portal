import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetSecretaryResponse = {
  secretary: {
    id: string;
    branch_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_SECRETARY: TypedDocumentNode<GetSecretaryResponse> = gql`
  query GetSecretary($id: uuid = "") {
    secretary: auth_secretarys_by_pk(id: $id) {
      id
      branch_id
      created_at
      updated_at
    }
  }
`;
