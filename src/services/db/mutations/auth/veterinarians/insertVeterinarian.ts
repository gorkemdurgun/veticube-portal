import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const insertVeterinarian = async (user_id: string, clinic_branch_id: string, specialization?: string) => {
  const { data } = await apolloGqlClient.mutate<{
    insert_auth_veterinarians: { returning: { id: string; user_id: string; clinic_branch_id: string; specialization: string }[] };
  }>({
    mutation: gql`
      mutation InsertVeterinarian($user_id: uuid = "", $clinic_branch_id: uuid = "", $specialization: String = "") {
        insert_auth_veterinarians(objects: { user_id: $user_id, clinic_branch_id: $clinic_branch_id, specialization: $specialization }) {
          returning {
            id
            user_id
            clinic_branch_id
            specialization
          }
        }
      }
    `,
    variables: {
      user_id,
      clinic_branch_id,
      specialization,
    },
  });

  return data;
};
