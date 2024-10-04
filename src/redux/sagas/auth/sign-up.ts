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

  try {
    const signupResponse = yield call(auth.signup.signupUser, name, email, password, phone_number);

    yield put(signUpSuccess());

    if (onSuccess) {
      onSuccess();
    }
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
