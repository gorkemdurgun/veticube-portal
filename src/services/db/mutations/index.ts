import { insertVeterinarian, updateVetRole, insertManager } from "./auth";
import { createBranch, createClinic } from "./clinics";

export const mutations = {
  auth: {
    veterinarians: {
      insertVeterinarian,
      updateVetRole,
    },
    managers: {
      insertManager,
    },
  },
  clinics: {
    createClinic,
    createBranch,
  },
};
