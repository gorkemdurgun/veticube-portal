import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetUserResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phone_number?: string;
    created_at: string;
    updated_at: string;
  }[];
};

export const GET_USER: TypedDocumentNode<GetUserResponse> = gql`
  query GetUser {
    user: auth_users {
      id
      name
      phone_number
      role
      email
      created_at
      updated_at
    }
  }
`;
