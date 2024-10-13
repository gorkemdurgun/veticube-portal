import { createAppointment } from "./appointments";
import { insertVeterinarian, updateVetRole } from "./auth";
import { createClinic, createBranch, addManagerToClinic } from "./clinics";
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
  },
  clinics: {
    createClinic,
    createBranch,
    addManagerToClinic,
  },
  appointments: {
    createAppointment,
  },
};
