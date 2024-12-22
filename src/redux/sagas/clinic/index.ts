import { takeLatest, takeEvery } from "redux-saga/effects";

import { createClinicRequest, updateEmployeeInviteRequest, getUserClinicAssignmentsRequest } from "@/redux/slices/clinic/clinicSlice";

import { createClinic } from "./create-clinic";
import { getUserClinicAssignments } from "./get-user-assignments";
import { updateIncomingInvite } from "./update-incoming-invite";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* clinicSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(createClinicRequest.type, createClinic);
  yield takeLatest(updateEmployeeInviteRequest.type, updateIncomingInvite);
  yield takeLatest(getUserClinicAssignmentsRequest.type, getUserClinicAssignments);
}

export default clinicSaga;
