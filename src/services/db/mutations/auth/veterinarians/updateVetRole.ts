import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const updateVetRole = async (user_id: string) => {
  const allowed_roles = "user,vet";
  const default_role = "vet";

  const { data } = await apolloGqlClient.mutate<{
    update_auth_users: { returning: { id: string; allowed_roles: string; default_role: string }[] };
  }>({
    mutation: gql`
      mutation UpdateVetRole($user_id: uuid = "", $allowed_roles: String = "", $default_role: String = "") {
        update_auth_users(where: { id: { _eq: $user_id } }, _set: { allowed_roles: $allowed_roles, default_role: $default_role }) {
          returning {
            id
            allowed_roles
            default_role
          }
        }
      }
    `,
    variables: {
      user_id,
      allowed_roles,
      default_role,
    },
  });

  return data;
};
