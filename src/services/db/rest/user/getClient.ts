import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetClientResponse = {
  client: {
    id: string;
    created_at: string;
    updated_at: string;
  };
};

export const getClient = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetClientResponse>(`/getClient/${id}`, {
      headers: {
        "x-hasura-role": "client",
      },
    });
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
