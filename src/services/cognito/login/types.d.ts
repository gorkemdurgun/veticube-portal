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

type GetUserResponse = {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    default_role: string;
    allowed_roles: string;
    country_code: string;
    phone_number: string;
    is_verified: boolean;
  };
};

type LoginRequestPayload = {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type LoginSuccessPayload = CognitoLoginResponse & {
  user?: GetUserResponse["user"];
};

type GetUserSuccessPayload = {
  user: GetUserResponse["user"];
};

type RefreshSessionRequestPayload = any;
/* {
  refreshToken: string;
  onSuccess: (response: CognitoLoginResponse) => void;
  onError: (error: string) => void;
};
  */

export type { LoginRequestPayload, LoginSuccessPayload, RefreshSessionRequestPayload };
