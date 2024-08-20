import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetClinicPetsResponse = {
  pet_list: {
    id: string;
    name: string;
    gender: string;
    birth_date: string;
    pet_clients: {
      client: {
        id: string;
        user: {
          first_name: string;
          last_name: string;
        };
      };
    }[];
  }[];
};
export const GET_CLINIC_PETS: TypedDocumentNode<GetClinicPetsResponse> = gql`
  query GetClinicPets {
    pet_list: pet_pets {
      id
      name
      gender
      birth_date
      pet_clients {
        client {
          id
          user {
            first_name
            last_name
          }
        }
      }
    }
  }
`;
