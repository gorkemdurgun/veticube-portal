import { GET_CLINIC_AND_BRANCHES } from "./clinic";
import { GET_CLINIC_PETS, GET_PET_DETAIL } from "./pet";

export const queries = {
  clinic: {
    GetClinicAndBranches: GET_CLINIC_AND_BRANCHES,
  },
  pet: {
    GetClinicPets: GET_CLINIC_PETS,
    GetPetDetail: GET_PET_DETAIL,
  },
};
