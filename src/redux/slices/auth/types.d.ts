/* eslint-disable no-unused-vars */

/* LOGIN */

type LoginRequestPayload = {
  email: string;
  password: string;
  onSuccess?: (userId: string, userRole: UserRole) => void;
  onError?: (error: string) => void;
};

type LoginSuccessPayload = {
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

/* SIGN UP */

type SignUpRequestPayload = {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};
