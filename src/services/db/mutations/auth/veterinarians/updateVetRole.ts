import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const updateVetRole = async (user_id: string) => {
  const allowed_roles = "user,vet";

  const { data } = await apolloGqlClient.mutate<{
    update_auth_users: { returning: { id: string; allowed_roles: string }[] };
  }>({
    mutation: gql`
      mutation UpdateVetRole($user_id: uuid = "", $allowed_roles: String = "") {
        update_auth_users(where: { id: { _eq: $user_id } }, _set: { allowed_roles: $allowed_roles }) {
          returning {
            id
            allowed_roles
          }
        }
      }
    `,
    variables: {
      user_id,
      allowed_roles,
    },
  });

  return data;
};
