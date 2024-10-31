import { axiosClient } from "@/services/restapi/client";
import toErrorMessage from "@/utils/toError";

type GetUserByIdResponse = {
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

export const getUserById = async (userId: string) => {
  try {
    const { data } = await axiosClient.get<GetUserByIdResponse>(`/getUserById/${userId}`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
