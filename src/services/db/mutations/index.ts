import { createAppointment } from "./appointments";
import { insertVeterinarian, updateVetRole } from "./auth";
import { createClinic, createBranch, addManagerToClinic, addClientRecordToBranch, sendEmployeeInvite, updateIncomingInvite } from "./clinics";
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
    addClientRecordToBranch,
    sendEmployeeInvite,
    updateIncomingInvite,
  },
  appointments: {
    createAppointment,
  },
};
