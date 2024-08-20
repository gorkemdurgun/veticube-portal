import { takeLatest, takeEvery } from "redux-saga/effects";


import { loginRequest, signUpVetAccountRequest } from "@/redux/slices/authSlice";

import { login } from "./login";
import { signUpVetAccount } from "./signup-vet";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(loginRequest.type, login);
  yield takeEvery(signUpVetAccountRequest.type, signUpVetAccount);
}

export default authSaga;
