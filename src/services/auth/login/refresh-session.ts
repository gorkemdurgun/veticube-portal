import { CognitoUserSession } from "amazon-cognito-identity-js";
import userPool from "../userpool";

export const refreshSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          reject(err);
          return;
        }

        cognitoUser.refreshSession(session.getRefreshToken(), (err: any, session: CognitoUserSession) => {
          if (err) {
            reject(err);
            console.log("Error refreshing session", err);
            return;
          }

          console.log("Refreshed session", session);
          resolve(session);
        });
      });
    } else {
      reject("No user found");
    }
  });
};
