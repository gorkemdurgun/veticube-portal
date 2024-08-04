import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

export const createClinic = async (name: string) => {
  console.log("createClinic", name);
  const { data, errors } = await apolloGqlClient.mutate<{
    clinic: { returning: { id: string; name: string }[] };
  }>({
    mutation: gql`
      mutation InsertClinic($name: String = "") {
        clinic: insert_clinic_clinics(objects: { name: $name }) {
          returning {
            id
            name
          }
        }
      }
    `,
    variables: {
      name,
    },
    context: {
      headers: {
        "x-hasura-role": "manager",
      },
    },
  }); 

  console.log("createclinic res", data, errors);
  return data;
};
