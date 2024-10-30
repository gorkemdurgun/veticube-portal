import { GET_CLINICS, GET_EMPLOYEE_INVITATIONS, SEARCH_BRANCH_CLIENT, GET_BRANCH_CLIENTS } from "./clinic";
import { GET_USER_DEVICES } from "./device";
import { GET_CLINIC_PETS, GET_PET_OVERVIEW, GET_REGISTERED_PATIENTS_CHART_DATA, SEARCH_PET } from "./pet";
import { GET_MY_INVITES } from "./settings";

export const queries = {
  clinic: {
    GetClinics: GET_CLINICS,
    GetEmployeeInvitations: GET_EMPLOYEE_INVITATIONS,
    SearchBranchClient: SEARCH_BRANCH_CLIENT,
    GetBranchClients: GET_BRANCH_CLIENTS,
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
  settings: {
    GetMyInvites: GET_MY_INVITES,
  },
};
