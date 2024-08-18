import { loginUser, refreshSession } from "./login";
import { signupUser, resendOtp, confirmUser } from "./signup";

export const auth = {
  login: {
    loginUser,
    refreshSession,
  },
  signup: {
    signupUser,
    resendOtp,
    confirmUser,
  },
};
