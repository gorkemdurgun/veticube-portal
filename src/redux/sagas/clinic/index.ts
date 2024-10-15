import { takeLatest, takeEvery } from "redux-saga/effects";

import { createClinicRequest, updateEmployeeInviteRequest } from "@/redux/slices/clinic/clinicSlice";

import { createClinic } from "./create-clinic";
import { updateIncomingInvite } from "./update-incoming-invite";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* clinicSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(createClinicRequest.type, createClinic);
  yield takeLatest(updateEmployeeInviteRequest.type, updateIncomingInvite);
}

export default clinicSaga;
