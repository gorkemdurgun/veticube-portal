import { gql } from "@apollo/client";

import type { TypedDocumentNode } from "@apollo/client";

export type GetSelectedDateReservationsResponse = {
  reservations: {
    appointment_time: string;
  }[];
};
export const GET_SELECTED_DATE_RESERVATIONS: TypedDocumentNode<GetSelectedDateReservationsResponse> = gql`
  query GetSelectedDateReservations($selectedDate: date = "") {
    reservations: clinic_appointments(where: { appointment_date: { _eq: $selectedDate } }) {
      appointment_time
    }
  }
`;
