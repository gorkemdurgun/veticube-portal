type CognitoLoginSuccessResponse = {
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

type GetUserSuccessResponse = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone_number?: string;
  created_at: string;
  updated_at: string;
};

type LoginRequestPayload = {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type RefreshSessionRequestPayload = any;
/* {
  refreshToken: string;
  onSuccess: (response: CognitoLoginResponse) => void;
  onError: (error: string) => void;
};
  */

export type { CognitoLoginSuccessResponse, GetUserSuccessResponse, LoginRequestPayload, RefreshSessionRequestPayload };
