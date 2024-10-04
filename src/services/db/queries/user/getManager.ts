import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetManagerResponse = {
  manager: {
    id: string;
    company_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_MANAGER: TypedDocumentNode<GetManagerResponse> = gql`
  query GetManager($id: uuid = "") {
    manager: auth_managers_by_pk(id: $id) {
      id
      company_id
      created_at
      updated_at
    }
  }
`;
