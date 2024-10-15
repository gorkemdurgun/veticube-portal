import { createAppointment } from "./appointments";
import { insertVeterinarian, updateVetRole } from "./auth";
import { createClinic, createBranch, addManagerToClinic, sendEmployeeInvite, updateIncomingInvite } from "./clinics";
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
    sendEmployeeInvite,
    updateIncomingInvite,
  },
  appointments: {
    createAppointment,
  },
};
