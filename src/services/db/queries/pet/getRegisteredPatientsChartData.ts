import { gql, TypedDocumentNode } from "@apollo/client";

type GetRegisteredPatientsChartDataResponse = {
  registeredPatients: {
    created_at: string;
  }[];
  totalPets: {
    aggregate: {
      count: number;
    };
  };
};
export const GET_REGISTERED_PATIENTS_CHART_DATA: TypedDocumentNode<GetRegisteredPatientsChartDataResponse> = gql`
  query GetRegisteredPatientsChartData($untilDate: timestamptz = "") {
    registeredPatients: pet_pets(where: { created_at: { _gte: $untilDate } }) {
      created_at
    }
    totalPets: pet_pets_aggregate {
      aggregate {
        count
      }
    }
  }
`;
