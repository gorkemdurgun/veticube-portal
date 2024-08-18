import { gql, TypedDocumentNode } from "@apollo/client";

type GetPetDetailResponse = {
  pet: {
    id: string;
    name: string;
  }[];
};
export const GET_PET_DETAIL: TypedDocumentNode<GetPetDetailResponse> = gql`
  query GetPetDetail($petId: uuid = "") {
    pet: pet_pets(where: { id: { _eq: $petId } }) {
      id
      name
    }
  }
`;
