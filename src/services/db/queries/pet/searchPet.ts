import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type SearchPetResponse = {
  searchResults: {
    id: string;
    name: string;
    clients: {
      client: {
        user: {
          id: string;
          first_name: string;
          last_name: string;
        };
      };
    }[];
  }[];
};

export const SEARCH_PET: TypedDocumentNode<SearchPetResponse> = gql`
  query SearchPatient($_ilike: String = "") {
    searchResults: pet_pets(where: { name: { _ilike: $_ilike } }) {
      id
      name
      clients: pet_clients {
        client {
          user {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
`;
