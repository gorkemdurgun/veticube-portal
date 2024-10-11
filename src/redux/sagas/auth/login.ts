import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/auth/authSlice";
import { getUserSuccess } from "@/redux/slices/user/userSlice";
import { auth } from "@/services/cognito";
import { rest } from "@/services/db";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    // Cognito login
    const authResponse = yield call(auth.login.loginUser, email, password);
    const userId = authResponse?.idToken?.payload?.sub;
    const userRole = authResponse?.idToken?.payload["custom:role"];

    console.log("authResponse", authResponse);

    if (!userId) {
      throw new Error("No user ID found in response");
    }

    // Session data to Redux
    yield put(
      loginSuccess({
        idToken: authResponse.idToken,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        clockDrift: authResponse.clockDrift,
      })
    );

    // Hasura rest req for user data
    const { user: getUserResponse } = yield call(rest.user.getUser, userId);
    console.log("getUserResponse", getUserResponse);

    if (!getUserResponse) {
      throw new Error("No user data found at index 0");
    }

    if (process.env.NODE_ENV === "development") {
      message.success(`Welcome, ${getUserResponse.name}!`);
    }

    // User data to Redux
    yield put(
      getUserSuccess({
        id: getUserResponse.id,
        name: getUserResponse.name,
        email: getUserResponse.email,
        role: userRole,
        phone_number: getUserResponse.phone_number,
        created_at: getUserResponse.created_at,
        updated_at: getUserResponse.updated_at,
      })
    );

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error(error);
    const strError = toErrorMessage(error);
    message.error(strError);
    yield put(loginFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
