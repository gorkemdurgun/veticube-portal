import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetUserResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_USER: TypedDocumentNode<GetUserResponse> = gql`
  query GetUser($id: uuid = "") {
    user: auth_users_by_pk(id: $id) {
      id
      email
      name
      phone_number
      created_at
      updated_at
    }
  }
`;
