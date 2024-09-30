import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";

import userPool from "@/services/cognito/userpool";

export const signupUser = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  countryCode: string,
  phoneNumber: string
): Promise<{
  user: CognitoUser | undefined;
  userId?: string;
}> => {
  const attributeList: CognitoUserAttribute[] = [];

  const dataEmail = {
    Name: "email",
    Value: email,
  };
  const dataFirstName = {
    Name: "name",
    Value: firstName,
  };
  const dataLastName = {
    Name: "family_name",
    Value: lastName,
  };
  const dataCountryCode = {
    Name: "locale",
    Value: countryCode,
  };
  const dataPhoneNumber = {
    Name: "phone_number",
    Value: phoneNumber,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeFirstName = new CognitoUserAttribute(dataFirstName);
  const attributeLastName = new CognitoUserAttribute(dataLastName);
  const attributeCountryCode = new CognitoUserAttribute(dataCountryCode);
  const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeEmail);
  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeCountryCode);
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
