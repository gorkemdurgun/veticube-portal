import { CognitoUserSession } from "amazon-cognito-identity-js";
import userPool from "../userpool";
import { message } from "antd";
import { store } from "@/redux/store";
import { loginSuccess, setTokens } from "@/redux/slices/authSlice";

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

          store.dispatch(
            setTokens({
              idToken: session.getIdToken().getJwtToken(),
              accessToken: session.getAccessToken().getJwtToken(),
              refreshToken: session.getRefreshToken().getToken(),
            })
          );
          message.success("Session refreshed!!!");
          resolve(session);
        });
      });
    } else {
      reject("No user found");
    }
  });
};
