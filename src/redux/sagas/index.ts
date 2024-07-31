import { all } from "redux-saga/effects";
import authSaga from "./auth";
import clinicSaga from "./clinic";

export default function* rootSaga(): Generator<any, void, unknown> {
  yield all([authSaga(), clinicSaga()]);
}
