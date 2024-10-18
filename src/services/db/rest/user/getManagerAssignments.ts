import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetManagerAssignmentsResponse = {
  assignment: {
    assigned_at: string;
    clinic: {
      id: string;
      clinic_name: string;
      branches: {
        id: string;
        branch_name: string;
      }[];
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
