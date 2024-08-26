import { loginUser } from "./login";
import { refreshSession } from "./refresh";
import { signupUser, resendOtp, confirmUser } from "./signup";

export const auth = {
  login: {
    loginUser,
  },
  refresh: {
    refreshSession,
  },
  signup: {
    signupUser,
    resendOtp,
    confirmUser,
  },
};
