import { nhostAuthApi } from "@/utils/api";
import toErrorMessage from "@/utils/toError";

type SigninEmailPasswordResponse = {
  email: string;
  id: string;
};

const url = "/signin/email-password";

export const signinEmailPassword = async (email: string, password: string) => {
  try {
    return await nhostAuthApi.post<SigninEmailPasswordResponse>(url, {
      email,
      password,
    });
  } catch (error) {
    const errorMessage = toErrorMessage(error);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
