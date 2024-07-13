import { nhostAuthApi } from "@/utils/api";
import toErrorMessage from "@/utils/toError";

type NhostSigninEmailPasswordOptions = {
  allowedRoles: AuthRoles[];
};
type SignupEmailPasswordResponse = {
  email: string;
  id: string;
};

const url = "/signup/email-password";
export const signupEmailPassword = async (email: string, password: string, options?: NhostSigninEmailPasswordOptions) => {
  try {
    return await nhostAuthApi.post<SignupEmailPasswordResponse>(url, {
      email,
      password,
      options,
    });
  } catch (error) {
    throw toErrorMessage(error);
  }
};
