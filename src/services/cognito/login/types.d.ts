type CognitoLoginResponse = {
  idToken: {
    jwtToken: string;
    payload: {
      sub: string;
      email_verified: boolean;
      "cognito:username": string;
      auth_time: number;
      name: string;
      phone_number: string;
      exp: number;
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
      token_use: string;
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
