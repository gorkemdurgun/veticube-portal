import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetUserByIdResponse = {
  user: {
    id: string;
    full_name: string;
    email: string;
    phone_number?: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<GetUserByIdResponse>(`/getUserById/${id}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
