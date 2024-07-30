import { login } from "./login";
import { signupUser, resendOtp, confirmUser } from "./signup";

export const auth = {
  login,
  signup: {
    signupUser,
    resendOtp,
    confirmUser,
  },
};
