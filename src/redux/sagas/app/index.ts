import { takeLatest } from "redux-saga/effects";

import { setActiveBranchRequest } from "@/redux/slices/app/appSlice";

import { setActiveBranch } from "./set-active-branch";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* appSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(setActiveBranchRequest.type, setActiveBranch);
}

export default appSaga;
