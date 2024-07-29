import { insertVeterinarian, updateVetRole } from "./auth";

export const mutations = {
  auth: {
    veterinarians: {
      insertVeterinarian,
      updateVetRole,
    },
  },
};
