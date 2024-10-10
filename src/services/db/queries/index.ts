import { GET_CLINIC_AND_BRANCHES, GET_SELECTED_DATE_RESERVATIONS, GET_CLINIC_BRANCH_EMPLOYEES } from "./clinic";
import { GET_USER_DEVICES } from "./device";
import { GET_CLINIC_PETS, GET_PET_OVERVIEW, GET_REGISTERED_PATIENTS_CHART_DATA } from "./pet";
import { SEARCH_PET } from "./pet/searchPet";

export const queries = {
  clinic: {
    GetClinicAndBranches: GET_CLINIC_AND_BRANCHES,
    GetSelectedDateReservations: GET_SELECTED_DATE_RESERVATIONS,
    GetClinicBranchEmployees: GET_CLINIC_BRANCH_EMPLOYEES,
  },
  pet: {
    GetClinicPets: GET_CLINIC_PETS,
    GetPetOverview: GET_PET_OVERVIEW,
    GetRegisteredPatientsChartData: GET_REGISTERED_PATIENTS_CHART_DATA,
    SearchPet: SEARCH_PET,
  },
  device: {
    GetUserDevices: GET_USER_DEVICES,
  },
};
