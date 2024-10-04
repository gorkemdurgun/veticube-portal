import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetNurseResponse = {
  nurse: {
    id: string;
    branch_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_NURSE: TypedDocumentNode<GetNurseResponse> = gql`
  query GetNurse($id: uuid = "") {
    nurse: auth_nurses_by_pk(id: $id) {
      id
      branch_id
      created_at
      updated_at
    }
  }
`;
