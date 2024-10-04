import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";

import userPool from "@/services/cognito/userpool";

export const signupUser = (
  name: string,
  email: string,
  password: string,
  phone_number?: string
): Promise<{
  user: CognitoUser | undefined;
  userId?: string;
}> => {
  const attributeList: CognitoUserAttribute[] = [];

  const dataEmail = {
    Name: "email",
    Value: email,
  };
  const dataName = {
    Name: "name",
    Value: name,
  };
  const dataPhoneNumber = {
    Name: "phone_number",
    Value: phone_number || "",
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeName = new CognitoUserAttribute(dataName);
  const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);
  attributeList.push(attributePhoneNumber);

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const userSub = result?.userSub;
      const cognitoUser = result?.user;
      if (userSub && cognitoUser) {
        resolve({
          user: cognitoUser,
          userId: userSub,
        });
      } else {
        reject(new Error("UserSub or CognitoUser is undefined"));
      }
    });
  });
};
