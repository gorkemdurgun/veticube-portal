import { CognitoUserSession } from "amazon-cognito-identity-js";
import userPool from "../userpool";
import { message } from "antd";

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
            message.error("Refresh session failed");
            return;
          }

          message.success("Session refreshed!!!");
          resolve(session);
        });
      });
    } else {
      reject("No user found");
    }
  });
};
