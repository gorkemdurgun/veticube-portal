import { CognitoUserSession } from "amazon-cognito-identity-js";
import { message } from "antd";


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

        cognitoUser.refreshSession(session.getRefreshToken(), (err: Error, session: CognitoUserSession) => {
          if (err) {
            reject(err);
            message.error("Refresh session failed");
            return;
          }

          /*
           */

          resolve(session);
        });
      });
    } else {
      reject("No user found");
    }
  });
};
