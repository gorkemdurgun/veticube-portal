import { nhostAuthAxios } from "@/utils/api";

export const signInEmailAndPassword = async (email: string, password: string) => {
  try {
    const { data } = await nhostAuthAxios.post("/signin/email-password", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
