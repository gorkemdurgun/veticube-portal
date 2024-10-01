import { CognitoUserPool } from "amazon-cognito-identity-js";

import type { ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "eu-central-1_T7DkMQDDE",
  ClientId: process.env.REACT_APP_CLIENT_ID || "54rb0uibv1g24947hqt9fsdn4d",
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
