import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

export const GQL = gql`
  mutation InsertDemoRequest(
    $clinic_name: String = ""
    $city: String = ""
    $district: String = ""
    $address: String = ""
    $services_offered: [String!] = ""
    $first_name: String = ""
    $last_name: String = ""
    $email: String = ""
    $phone: String = ""
    $active_softwares: [String!] = ""
    $feedback_channel: [String!] = ""
  ) {
    demo_request: insert_request_demo_requests(
      objects: {
        clinic_name: $clinic_name
        city: $city
        district: $district
        address: $address
        services_offered: $services_offered
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone: $phone
        active_softwares: $active_softwares
        feedback_channel: $feedback_channel
      }
    ) {
      affected_rows
    }
  }
`;

const service = async (
  clinic_name: string,
  city: string,
  district: string,
  address: string,
  services_offered: string[],
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  feedback_channel: string[],
  active_softwares?: string[]
) => {
  const { data } = await apolloGqlClient.mutate<{
    demo_request: { affected_rows: number };
  }>({
    mutation: GQL,
    variables: {
      clinic_name,
      city,
      district,
      address,
      services_offered,
      first_name,
      last_name,
      email,
      phone,
      feedback_channel,
      active_softwares: active_softwares || [],
    },
  });

  return data;
};

export { service as createDemoRequest };
