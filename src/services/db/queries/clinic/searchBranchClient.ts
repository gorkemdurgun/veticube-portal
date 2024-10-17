import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type SearchBranchClientResponse = {
  records: {
    email: string;
    full_name: string;
    phone_number: string;
    created_at: string;
    branch_id: string;
    id: string;
    pets: {
      id: string;
      name: string;
      gender: string;
      birthdate: string;
      breed: {
        name: string;
        species_name: string;
      };
    }[];
  }[];
};

export const SEARCH_BRANCH_CLIENT: TypedDocumentNode<SearchBranchClientResponse> = gql`
  query SearchBranchClient($term: String = "") {
    records: clinic_management_branch_client_records(
      limit: 10
      where: {
        _or: [
          { email: { _ilike: $term } }
          { full_name: { _ilike: $term } }
          { pets: { name: { _ilike: $term } } } # Hayvan adı ile arama kriteri
        ]
      }
    ) {
      email
      full_name
      phone_number
      created_at
      branch_id
      id
      pets {
        id
        name
        gender
        birthdate
        breed {
          name
          species_name
        }
      }
    }
  }
`;
