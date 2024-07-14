import { nhostHasuraRestApi } from "@/utils/api";

export const getNotes = async () => {
  try {
    const response = await nhostHasuraRestApi.get("/getNotes");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};