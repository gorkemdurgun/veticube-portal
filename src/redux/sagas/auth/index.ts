import { takeLatest, takeEvery } from "redux-saga/effects";

import { loginRequest, signUpRequest } from "@/redux/slices/auth/authSlice";

import { login } from "./login";
import { signUp } from "./sign-up";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(loginRequest.type, login);
  yield takeEvery(signUpRequest.type, signUp);
}

export default authSaga;
