import { gql } from "@apollo/client";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";

const GQL = gql`
  mutation CreateAppointment(
    $pet_id: uuid = ""
    $clinic_branch_id: uuid = ""
    $appointment_date: date = ""
    $appointment_time: time = ""
    $appointment_type: String = ""
    $notes: String = ""
  ) {
    insert_clinic_appointments(
      objects: {
        pet_id: $pet_id
        clinic_branch_id: $clinic_branch_id
        appointment_date: $appointment_date
        appointment_time: $appointment_time
        appointment_type: $appointment_type
        notes: $notes
      }
    ) {
      affected_rows
      returning {
        id
        pet_id
        appointment_date
        appointment_time
        appointment_type
        status
      }
    }
  }
`;

const service = async (
  pet_id: string,
  clinic_branch_id: string,
  appointment_date: string,
  appointment_time: string,
  appointment_type: string,
  notes?: string
) => {
  const { data } = await apolloGqlClient.mutate<{
    insert_clinic_appointments: { affected_rows: number; returning: any[] };
  }>({
    mutation: GQL,
    variables: {
      pet_id,
      clinic_branch_id,
      appointment_date,
      appointment_time,
      appointment_type,
      notes,
    },
  });

  return data;
};

export { service as createAppointment };
