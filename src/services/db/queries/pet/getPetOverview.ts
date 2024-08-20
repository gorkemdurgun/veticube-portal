import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetPetOverviewResponse = {
  pet: {
    id: string;
    name: string;
    chip_id: string;
    pet_breed: {
      breed: string;
      species: string;
    };
    gender: string;
    neutralized: boolean;
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
export const GET_PET_OVERVIEW: TypedDocumentNode<GetPetOverviewResponse> = gql`
  query GetPetOverview($petId: uuid = "") {
    pet: pet_pets(where: { id: { _eq: $petId } }) {
      id
      name
      chip_id
      pet_breed {
        breed: breed_name
        species
      }
      gender
      neutralized
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
