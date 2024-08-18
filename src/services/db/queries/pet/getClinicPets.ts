import { gql } from "@apollo/client";

export const GET_CLINIC_PETS = gql`
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
