import { takeLatest, takeEvery } from "redux-saga/effects";

import { createAppointmentRequest } from "@/redux/slices/appointment/appointmentSlice";

import { createAppointment } from "./create-appointment";

import type { ForkEffect } from "redux-saga/effects";

// Ana saga fonksiyonu
function* appointmentSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(createAppointmentRequest.type, createAppointment);
}

export default appointmentSaga;
