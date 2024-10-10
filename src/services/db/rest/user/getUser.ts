import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

type GetUserResponse = {
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

export const getUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetUserResponse>(`/getUser/${id}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
