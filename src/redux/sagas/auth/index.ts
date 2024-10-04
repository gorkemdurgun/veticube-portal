import { takeLatest, takeEvery } from "redux-saga/effects";

import { loginRequest } from "@/redux/slices/auth/authSlice";

import { login } from "./login";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(loginRequest.type, login);
}

export default authSaga;
