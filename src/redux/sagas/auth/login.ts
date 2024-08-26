import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/authSlice";
import { auth } from "@/services/cognito";
import { queries } from "@/services/db";
import { GetUserResponse } from "@/services/db/queries/user";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    const authResponse = yield call(auth.login.loginUser, email, password);
    const userId = authResponse?.idToken?.payload?.sub;

    if (!userId) {
      throw new Error("No user ID found in response");
    }

    yield put(
      loginSuccess({
        idToken: authResponse.idToken.jwtToken,
        refreshToken: authResponse.refreshToken.token,
        accessToken: authResponse.accessToken.jwtToken,
      })
    );

    message.success("Login successful");

    const { data: userData } = yield call([apolloGqlClient, apolloGqlClient.query], {
      query: queries.user.GetUser,
      variables: {
        id: userId,
      },
    });

    if (!userData) {
      throw new Error("No user data found");
    }

    yield put(
      loginSuccess({
        ...authResponse,
        user: userData.user as GetUserResponse["user"],
      })
    );

    message.success("User data fetched");

    /*
    if (onSuccess) {
      onSuccess();
    }
    */
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
