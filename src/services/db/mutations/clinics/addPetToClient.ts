import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation AddPetToClient(
    $owner_id: uuid
    $name: String
    $breed_id: uuid
    $gender: pet_management_gender_enum
    $birthdate: date
    $medical_notes: String
    $chip_number: String
  ) {
    insert_pet_management_pets(
      objects: {
        owner_id: $owner_id
        name: $name
        breed_id: $breed_id
        gender: $gender
        birthdate: $birthdate
        medical_notes: $medical_notes
        chip_number: $chip_number
      }
    ) {
      affected_rows
      returning {
        id
        owner_id
        name
        breed_id
        gender
        birthdate
        medical_notes
        created_at
        updated_at
        chip_number
      }
    }
  }
`;

export const addPetToClient = async (
  owner_id: string,
  name: string,
  breed_id?: string,
  gender?: string,
  birthdate?: string,
  medical_notes?: string
) => {
  const { data, errors } = await apolloGqlClient.mutate<{}>({
    mutation: GQL,
    variables: {
      owner_id,
      name,
      breed_id,
      gender,
      birthdate,
      medical_notes,
    },
  });
  return data;
};
