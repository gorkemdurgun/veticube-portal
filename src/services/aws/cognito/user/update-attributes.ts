import { CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";

import type { ICognitoUserAttributeData } from "amazon-cognito-identity-js";

import userPool from "../userpool";

export const updateAttributes = (attributes: { Name: string; Value: string }[]) => {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();

    user?.getSession((err: Error, session: CognitoUserSession | null) => {
      if (err) {
        console.error("Failed to get session", err);
        reject("Failed to get session");
        return;
      }

      if (!session?.isValid()) {
        console.error("Session is not valid");
        reject("Session is not valid");
        return;
      }

      const attributeList: ICognitoUserAttributeData[] = attributes.map((attr) => {
        return new CognitoUserAttribute(attr);
      });

      user?.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.error("Update attributes failed", err);
          reject(err);
          return;
        }

        console.log("Update attributes success", result);
        resolve(result);
      });
    });

    if (!user) {
      console.error("No user found");
      reject("No user found");
      return;
    }
  });
};
