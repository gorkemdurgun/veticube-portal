import { hasuraRestAxios } from "@/utils/api";

export const getPets = async () => {
  try {
    const { data } = await hasuraRestAxios.get("/getPets");
    console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
