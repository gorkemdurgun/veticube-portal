import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetEmployeeAssignmentsResponse = {
  assignment: {
    role: UserRole;
    assigned_at: string;
    branch: {
      id: string;
      branch_name: string;
    };
  };
};

export const getEmployeeAssignments = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get<GetEmployeeAssignmentsResponse>(`/getEmployeeAssignments/${userId}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
