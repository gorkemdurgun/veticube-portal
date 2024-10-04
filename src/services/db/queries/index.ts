import { GET_CLINIC_AND_BRANCHES, GET_SELECTED_DATE_RESERVATIONS, GET_CLINIC_BRANCH_EMPLOYEES } from "./clinic";
import { GET_USER_DEVICES } from "./device";
import { GET_CLINIC_PETS, GET_PET_OVERVIEW, GET_REGISTERED_PATIENTS_CHART_DATA } from "./pet";
import { SEARCH_PET } from "./pet/searchPet";
import { GET_USER, GET_MANAGER, GET_VETERINARIAN, GET_NURSE, GET_SECRETARY, GET_CLIENT } from "./user";

export const queries = {
  user: {
    GetUser: GET_USER,
    GetManager: GET_MANAGER,
    GetVeterinarian: GET_VETERINARIAN,
    GetNurse: GET_NURSE,
    GetSecretary: GET_SECRETARY,
    GetClient: GET_CLIENT,
  },
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
