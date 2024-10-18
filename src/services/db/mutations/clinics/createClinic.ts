import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation InsertClinic($clinic_name: String) {
    insert_clinic: insert_clinic_management_clinics(objects: { clinic_name: $clinic_name }) {
      affected_rows
      returning {
        id
        clinic_name
        created_at
        updated_at
      }
    }
  }
`;

export const createClinic = async (clinic_name: string) => {
  const { data, errors } = await apolloGqlClient.mutate<{
    clinic: { returning: { id: string; clinic_name: string }[] };
  }>({
    mutation: GQL,
    variables: {
      clinic_name,
    },
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  });

  // console.log("createclinic res", data, errors);
  return data;
};
