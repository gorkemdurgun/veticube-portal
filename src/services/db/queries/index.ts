import { GET_CLINIC_AND_BRANCHES } from "./clinic";
import { GET_CLINIC_PETS, GET_PET_OVERVIEW, GET_REGISTERED_PATIENTS_CHART_DATA } from "./pet";

export const queries = {
  clinic: {
    GetClinicAndBranches: GET_CLINIC_AND_BRANCHES,
  },
  pet: {
    GetClinicPets: GET_CLINIC_PETS,
    GetPetOverview: GET_PET_OVERVIEW,
    GetRegisteredPatientsChartData: GET_REGISTERED_PATIENTS_CHART_DATA,
  },
};
