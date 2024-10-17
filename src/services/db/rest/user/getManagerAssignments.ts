import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetManagerAssignmentsResponse = {
  assignment: {
    role: UserRole;
    assigned_at: string;
    branch: {
      id: string;
      branch_name: string;
    };
  };
};

export const getManagerAssignments = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get<GetManagerAssignmentsResponse>(`/getManagerAssignments/${userId}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
