import { nhostAuthApi } from "@/utils/api";
import toErrorMessage from "@/utils/toError";

type SignupEmailPasswordResponse = {
  email: string;
  id: string;
};

const url = "/signup/email-password";

export const signupEmailPassword = async (email: string, password: string) => {
  try {
    return await nhostAuthApi.post<SignupEmailPasswordResponse>(url, {
      email,
      password,
    });
  } catch (error) {
    const errorMessage = toErrorMessage(error);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
