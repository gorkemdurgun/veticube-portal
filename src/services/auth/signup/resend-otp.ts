import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../userpool";

type ResendOtpResponse = {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
    Destination: string;
  };
};

export const resendOtp = (email: string, onSuccess: (email: string) => void): Promise<ResendOtpResponse> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      onSuccess(email);
    });
  });
};
