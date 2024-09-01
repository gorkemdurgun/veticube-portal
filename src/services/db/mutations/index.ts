import { createAppointment } from "./appointments";
import { insertVeterinarian, updateVetRole, insertManager } from "./auth";
import { createClinic, createBranch } from "./clinics";
import { createDemoRequest } from "./requests";

export const mutations = {
  requests: {
    createDemoRequest,
  },
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
  appointments: {
    createAppointment,
  },
};
