import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetUserResponse = {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    default_role: string;
    allowed_roles: string;
    country_code: string;
    phone_number: string;
    is_verified: boolean;
  };
};

export const GET_USER: TypedDocumentNode<GetUserResponse> = gql`
  query GetUser($id: uuid = "") {
    user: auth_users_by_pk(id: $id) {
      id
      email
      first_name
      last_name
      default_role
      allowed_roles
      country_code
      phone_number
      is_verified
    }
  }
`;
