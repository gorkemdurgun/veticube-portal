import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetManagerResponse = {
  user: {
    id: string;
    name: string;
    phone_number: string;
    role: string;
    email: string;
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
    return data.user;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
