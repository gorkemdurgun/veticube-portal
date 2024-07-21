import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "eu-central-1_qqd4y5wSW",
  ClientId: process.env.REACT_APP_CLIENT_ID || "3rrg0vl5fuicbo623icn0av4d9",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
