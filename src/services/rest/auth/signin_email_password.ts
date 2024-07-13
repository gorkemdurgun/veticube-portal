import { nhostAuthApi } from "@/utils/api";
import toErrorMessage from "@/utils/toError";

type SigninEmailPasswordResponse = {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenId: string;
  user: User;
};

const url = "/signin/email-password";
export const signinEmailPassword = async (email: string, password: string) => {
  try {
    return await nhostAuthApi.post<SigninEmailPasswordResponse>(url, {
      email,
      password,
    });
  } catch (error) {
    throw toErrorMessage(error);
  }
};
