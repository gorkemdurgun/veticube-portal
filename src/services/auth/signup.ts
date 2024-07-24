import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import userPool from "./userpool";

export const signup = (email: string, password: string) => {
  const attributeList: CognitoUserAttribute[] = [];

  const dataEmail = {
    Name: "email",
    Value: email,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const cognitoUser = result?.user;
      resolve(cognitoUser);
    });
  });
};
