import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { gql } from "@apollo/client";

type Item = {
  id: string;
  pet: string;
};

type GetDenemeResponse = {
  deneme: Item[];
};

export const getDeneme = async () => {
  const { data } = await apolloGqlClient.query<GetDenemeResponse>({
    query: gql`
      query MyQuery {
        deneme {
          pet
        }
      }
    `,
  });

  return data.deneme;
};
