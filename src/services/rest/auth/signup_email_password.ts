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
    throw toErrorMessage(error);
  }
};
