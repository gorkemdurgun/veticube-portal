import { getEmployeeAssignments } from "./getEmployeeAssignments";
import { getManagerAssignments } from "./getManagerAssignments";
import { getUserById } from "./getUserById";

export const userServices = {
  getUserById,
  getManagerAssignments,
  getEmployeeAssignments,
};
