import { call, put, CallEffect, PutEffect } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/slices/authSlice";
import { auth } from "@/services/auth";
import { mutations } from "@/services/db";
import toErrorMessage from "@/utils/toError";

export function* login(action: ReturnType<typeof loginRequest>): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  const { email, password, onSuccess, onError } = action.payload;
  try {
    const response = yield call(auth.login, email, password);
    console.log(response);
    yield put(
      loginSuccess({
        idToken: response.idToken.jwtToken,
        refreshToken: response.refreshToken.token,
        accessToken: response.accessToken.jwtToken,
      })
    );
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    const strError = toErrorMessage(error);
    yield put(loginFailure(strError));
    if (onError) {
      onError(strError);
    }
  }
}
