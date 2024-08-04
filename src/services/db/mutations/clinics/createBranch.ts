import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const GQL = gql`
  mutation InsertClinicBranches($address: String, $branch_name: String, $city: String, $phone: String, $clinic_id: uuid) {
    branch: insert_clinic_clinic_branches(
      objects: { address: $address, branch_name: $branch_name, city: $city, phone: $phone, clinic_id: $clinic_id }
    ) {
      affected_rows
      returning {
        id
        branch_name
      }
    }
  }
`;

const service = async (clinic_id: string, branch_name: string, city?: string, address?: string, phone?: string) => {
  const reqRole = "manager";
  const { data } = await apolloGqlClient.mutate<{
    branch: { returning: { id: string; branch_name: string }[]; affected_rows: number };
  }>({
    mutation: GQL,
    variables: {
      clinic_id,
      branch_name,
      city,
      address,
      phone,
    },
    context: {
      headers: {
        "x-hasura-role": reqRole,
      },
    },
  });

  return data;
};

export { service as createBranch };
