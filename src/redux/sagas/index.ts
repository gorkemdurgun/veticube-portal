import { all } from "redux-saga/effects";

import appSaga from "./app";
import authSaga from "./auth";
import clinicSaga from "./clinic";

export default function* rootSaga(): Generator<any, void, unknown> {
  yield all([appSaga(), authSaga(), clinicSaga()]);
}
