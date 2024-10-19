import toErrorMessage from "@/utils/toError";

import { axiosInstance } from "..";

export type GetBreedsResponse = {
  breeds: Breed[];
};

export const getBreeds = async () => {
  try {
    const { data } = await axiosInstance.get<GetBreedsResponse>(`/getBreeds`);
    return data;
  } catch (error) {
    const strError = toErrorMessage(error);
    throw new Error(strError);
  }
};
