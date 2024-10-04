import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetClientResponse = {
  client: {
    id: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_CLIENT: TypedDocumentNode<GetClientResponse> = gql`
  query GetClient($id: uuid = "") {
    client: auth_clients_by_pk(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;
