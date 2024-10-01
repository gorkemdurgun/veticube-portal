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
    name: string;
    phone_number: string;
    updated_at: string;
    created_at: string;
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
