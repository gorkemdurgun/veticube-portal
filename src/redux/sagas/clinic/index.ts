import { takeLatest, takeEvery } from "redux-saga/effects";


import { createClinicRequest } from "@/redux/slices/clinicSlice";

import { createClinic } from "./create-clinic";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* clinicSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(createClinicRequest.type, createClinic);
}

export default clinicSaga;
