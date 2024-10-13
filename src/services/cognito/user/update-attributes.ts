import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import userPool from "../userpool";

export const updateAttributes = (email: string, newRole: UserRole) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.updateAttributes(
      [
        {
          Name: "custom:role",
          Value: newRole,
        },
      ],
      (err, result) => {
        if (err) {
          console.error("Update attributes failed", err);
          reject(err);
          return;
        }

        console.log("Update attributes success", result);
        resolve(result);
      }
    );
  });
};
