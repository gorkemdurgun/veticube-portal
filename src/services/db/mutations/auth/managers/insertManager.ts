import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const insertManager = async (user_id: string, clinic_id: string) => {
  const { data } = await apolloGqlClient.mutate<{
    manager: { returning: { id: string; clinic_id: string }[] };
  }>({
    mutation: gql`
      mutation InsertManager($user_id: uuid = "", $clinic_id: uuid = "") {
        manager: insert_auth_managers(objects: { user_id: $user_id, clinic_id: $clinic_id }) {
          returning {
            id
            clinic_id
          }
        }
      }
    `,
    variables: {
      user_id,
      clinic_id,
    },
  });

  return data;
};
