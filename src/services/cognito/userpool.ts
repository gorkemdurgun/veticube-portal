import { CognitoUserPool } from "amazon-cognito-identity-js";

import type { ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "eu-central-1_rCuy5ZQTt",
  ClientId: process.env.REACT_APP_CLIENT_ID || "7vsnlvif912c6rijks0s91mfe3",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
