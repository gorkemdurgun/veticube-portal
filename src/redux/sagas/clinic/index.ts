import { takeLatest, takeEvery, ForkEffect } from "redux-saga/effects";
import { createClinicRequest } from "@/redux/slices/clinicSlice";

import { createClinic } from "./create-clinic";

// Ana saga fonksiyonu
function* clinicSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(createClinicRequest.type, createClinic);
}

export default clinicSaga;
