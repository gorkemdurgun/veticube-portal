import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

type GetClinicPetsResponse = {
  petList: {
    id: string;
    name: string;
    gender: string;
    birth_date: string;
    client: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
      };
    };
  }[];
};
export const GET_CLINIC_PETS: TypedDocumentNode<GetClinicPetsResponse> = gql`
  query GetClinicPets {
    petList: pet_pets {
      id
      name
      gender
      birth_date
      client {
        id
        user {
          first_name
          last_name
        }
      }
    }
  }
`;
