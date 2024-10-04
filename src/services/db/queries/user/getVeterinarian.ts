import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetVeterinarianResponse = {
  veterinarian: {
    id: string;
    specialty: string;
    branch_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const GET_VETERINARIAN: TypedDocumentNode<GetVeterinarianResponse> = gql`
  query GetVeterinarian($id: uuid = "") {
    veterinarian: auth_veterinarians_by_pk(id: $id) {
      id
      specialty
      branch_id
      created_at
      updated_at
    }
  }
`;
