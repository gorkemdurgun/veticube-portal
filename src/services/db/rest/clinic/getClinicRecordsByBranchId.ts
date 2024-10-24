import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetClinicRecordsByBranchIdResponse = {
  clinic: {
    branch_client_records: BranchClients[];
  };
};

export const getClinicRecordsByBranchId = async (branch_id: string) => {
  try {
    const { data } = await axiosInstance.get<GetClinicRecordsByBranchIdResponse>(`/getClinicRecordsByBranchId/${branch_id}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
