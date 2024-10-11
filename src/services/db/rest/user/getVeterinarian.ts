import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetVeterinarianResponse = {
  veterinarian: {
    id: string;
    branch_id: string;
    specialty: string;
    created_at: string;
    updated_at: string;
  };
};

export const getVeterinarian = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetVeterinarianResponse>(`/getVeterinarian/${id}`, {
      headers: {
        "x-hasura-role": "veterinarian",
      },
    });
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
