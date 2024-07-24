type CognitoLoginResponse = {
  idToken: {
    jwtToken: string;
    payload: {
      sub: string;
      email_verified: boolean;
      "https://hasura.io/jwt/claims": string;
      iss: string;
      "cognito:username": string;
      origin_jti: string;
      aud: string;
      event_id: string;
      token_use: string;
      "custom:allowedRoles": string;
      auth_time: number;
      exp: number;
      "custom:role": string;
      iat: number;
      jti: string;
      email: string;
    };
  };
  refreshToken: {
    token: string;
  };
  accessToken: {
    jwtToken: string;
    payload: {
      sub: string;
      iss: string;
      client_id: string;
      origin_jti: string;
      event_id: string;
      token_use: string;
      scope: string;
      auth_time: number;
      exp: number;
      iat: number;
      jti: string;
      username: string;
    };
  };
  clockDrift: number;
};

type ClientSession = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};
