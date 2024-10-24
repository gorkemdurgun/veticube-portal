import { all } from "redux-saga/effects";

import appSaga from "./app";
import appointmentSaga from "./appointments";
import authSaga from "./auth";
import clinicSaga from "./clinic";

export default function* rootSaga(): Generator<any, void, unknown> {
  yield all([appSaga(), authSaga(), clinicSaga(), appointmentSaga()]);
}
