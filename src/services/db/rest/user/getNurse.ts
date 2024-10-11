import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetNurseResponse = {
  nurse: {
    id: string;
    branch_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const getNurse = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetNurseResponse>(`/getNurse/${id}`, {
      headers: {
        "x-hasura-role": "nurse",
      },
    });
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
