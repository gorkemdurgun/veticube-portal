import { gql, TypedDocumentNode } from "@apollo/client";

type GetPetOverviewResponse = {
  pet: {
    id: string;
    name: string;
    chip_id: string;
    petBreed: {
      breed: string;
      species: string;
    };
    gender: string;
    neutralized: boolean;
    birth_date: string;
  }[];
};
export const GET_PET_OVERVIEW: TypedDocumentNode<GetPetOverviewResponse> = gql`
  query GetPetOverview($petId: uuid = "") {
    pet: pet_pets(where: { id: { _eq: $petId } }) {
      id
      name
      chip_id
      petBreed: pet_breed {
        breed: breed_name
        species
      }
      gender
      neutralized
      birth_date
    }
  }
`;
