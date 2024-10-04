import { message } from "antd";
import { call, put } from "redux-saga/effects";

import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { signUpRequest, signUpSuccess, signUpFailure } from "@/redux/slices/auth/authSlice";
import { getUserSuccess } from "@/redux/slices/user/userSlice";
import { auth } from "@/services/cognito";
import { queries } from "@/services/db";
import { GetUserResponse } from "@/services/db/queries/user";
import toErrorMessage from "@/utils/toError";

import type { CallEffect, PutEffect } from "redux-saga/effects";

export function* signUp(action: ReturnType<typeof signUpRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { name, phone_number, email, password, onSuccess, onError } = action.payload;

  console.log("signUp action", action);
  try {
    /*
    const signupResponse = yield call(auth.signup.signupUser, name, email, password, phone_number);

    console.log("signupResponse", signupResponse);
    */
    /*

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

    */
  } catch (error) {
    console.error(error);
    const strError = toErrorMessage(error);
    message.error(strError);
    yield put(signUpFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
