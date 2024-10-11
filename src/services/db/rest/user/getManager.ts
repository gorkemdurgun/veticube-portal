import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetManagerResponse = {
  manager: {
    id: string;
    company_id: string;
    created_at: string;
    updated_at: string;
  };
};

export const getManager = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetManagerResponse>(`/getManager/${id}`, {
      headers: {
        "x-hasura-role": "manager",
      },
    });
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
