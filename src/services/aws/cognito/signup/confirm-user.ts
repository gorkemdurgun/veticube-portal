import { CognitoUser } from "amazon-cognito-identity-js";

import userPool from "../userpool";

type ConfirmUserResponse = any;

export const confirmUser = (
  otp: string,
  email: string,
  onSuccess: () => void,
  onError: (error: Error) => void
): Promise<ConfirmUserResponse> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        onError(err);
        // reject(err);
        return;
      }

      onSuccess();
      resolve(result);
    });
  });
};
