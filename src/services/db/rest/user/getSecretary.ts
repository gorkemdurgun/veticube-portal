import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetSecretaryResponse = {
  secretary: {
    id: string;
    branch_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const getSecretary = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetSecretaryResponse>(`/getSecretary/${id}`, {
      headers: {
        "x-hasura-role": "secretary",
      },
    });
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
