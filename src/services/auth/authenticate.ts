import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userPool from "./userpool";

export const authenticate = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log("Login success", session);
        resolve(session);
      },
      onFailure: (err) => {
        console.error("Login failed", err);
        reject(err);
      },
      newPasswordRequired(userAttributes, requiredAttributes) {
        console.log("New password required", userAttributes, requiredAttributes);
        resolve({ userAttributes, requiredAttributes });
      },
    });
  });
};

export const verifyEmail = (email: string, code: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error("Email verification failed", err);
        reject(err);
        return;
      }

      console.log("Email verification success", result);
      resolve(result);
    });
  });
}
