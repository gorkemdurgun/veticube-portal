import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/authSlice";
import { getUserSuccess } from "@/redux/slices/userSlice";
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

    console.log("authResponse", authResponse);

    if (!userId) {
      throw new Error("No user ID found in response");
    }

    yield put(
      loginSuccess({
        idToken: authResponse.idToken,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        clockDrift: authResponse.clockDrift,
      })
    );

    message.success("Login successful");

    const { data: userData } = yield call([apolloGqlClient, apolloGqlClient.query], {
      query: queries.user.GetUser,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${authResponse.idToken.jwtToken}`,
        },
      },
    });

    console.log("userData", userData);

    if (!userData) {
      throw new Error("No user data found");
    }

    const dataOfUser = userData.user[0] as GetUserResponse["user"][0];

    if (!dataOfUser) {
      throw new Error("No user data found");
    }

    console.log("dataOfUser", dataOfUser);

    yield put(
      getUserSuccess({
        id: dataOfUser.id,
        email: dataOfUser.email,
        name: dataOfUser.name,
        role: dataOfUser.role,
        phone_number: dataOfUser.phone_number,
        created_at: dataOfUser.created_at,
        updated_at: dataOfUser.updated_at,
      })
    );

    message.success("User data fetched");

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
